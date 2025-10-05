"use server";

import { db } from "@/db";
import { order, client, delivery } from "@/db/schema";
import { eq, sql, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Fetch orders with pagination
export const fetchOrders = async (page: number = 1, pageSize: number = 10) => {
  try {
    const offset = (page - 1) * pageSize;

    // Get total count
    const totalCountResult = await db.select({ count: count() }).from(order);
    const totalCount = totalCountResult[0].count;

    // Get paginated orders
    const orders = await db.query.order.findMany({
      with: {
        client: true,
        delivery: true,
      },
      orderBy: (order, { desc }) => [desc(order.createdAt)],
      limit: pageSize,
      offset: offset,
    });

    return {
      success: true,
      data: orders,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
};

// Update order status
export const updateOrderStatus = async (orderId: number, newStatus: string) => {
  try {
    await db
      .update(order)
      .set({
        status: newStatus,
        updatedAt: new Date().toISOString().split("T")[0],
      })
      .where(eq(order.id, orderId));

    revalidatePath("/admin/orders");
    return { success: true, message: "Status updated successfully" };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update status" };
  }
};

// Delete order
export const deleteOrder = async (orderId: number) => {
  try {
    // First delete the delivery record if exists
    await db.delete(delivery).where(eq(delivery.orderId, orderId));

    // Then delete the order
    await db.delete(order).where(eq(order.id, orderId));

    revalidatePath("/admin/orders");
    return { success: true, message: "Order deleted successfully" };
  } catch (error) {
    console.error("Error deleting order:", error);
    return { success: false, error: "Failed to delete order" };
  }
};

// Get order details by ID
export const getOrderById = async (orderId: number) => {
  try {
    const orderData = await db.query.order.findFirst({
      where: eq(order.id, orderId),
      with: {
        client: true,
        delivery: true,
      },
    });

    if (!orderData) {
      return { success: false, error: "Order not found" };
    }

    return { success: true, data: orderData };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { success: false, error: "Failed to fetch order" };
  }
};

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    // Total orders count
    const totalOrdersResult = await db.select({ count: count() }).from(order);
    const totalOrders = totalOrdersResult[0].count;

    // Total revenue (only delivered orders: sum of totalCost + delivery fees)
    const deliveredRevenueResult = await db
      .select({
        totalRevenue: sql<number>`COALESCE(SUM(${order.totalCost}), 0)`,
      })
      .from(order)
      .where(eq(order.status, "delivered"));

    // Delivery fees for delivered orders only
    const deliveredFeesResult = await db
      .select({
        totalFees: sql<number>`COALESCE(SUM(${delivery.fees}), 0)`,
      })
      .from(delivery)
      .innerJoin(order, eq(delivery.orderId, order.id))
      .where(eq(order.status, "delivered"));

    const deliveredRevenue =
      Number(deliveredRevenueResult[0].totalRevenue) +
      Number(deliveredFeesResult[0].totalFees);

    // Cancelled orders revenue (to subtract from total)
    const cancelledRevenueResult = await db
      .select({
        totalRevenue: sql<number>`COALESCE(SUM(${order.totalCost}), 0)`,
      })
      .from(order)
      .where(eq(order.status, "cancelled"));

    const cancelledFeesResult = await db
      .select({
        totalFees: sql<number>`COALESCE(SUM(${delivery.fees}), 0)`,
      })
      .from(delivery)
      .innerJoin(order, eq(delivery.orderId, order.id))
      .where(eq(order.status, "cancelled"));

    const cancelledRevenue =
      Number(cancelledRevenueResult[0].totalRevenue) +
      Number(cancelledFeesResult[0].totalFees);

    // Final revenue = delivered - cancelled
    const totalRevenue = deliveredRevenue - cancelledRevenue;

    // Delivered orders count
    const deliveredResult = await db
      .select({ count: count() })
      .from(order)
      .where(eq(order.status, "delivered"));
    const deliveredOrders = deliveredResult[0].count;

    // Cancelled orders count
    const cancelledResult = await db
      .select({ count: count() })
      .from(order)
      .where(eq(order.status, "cancelled"));
    const cancelledOrders = cancelledResult[0].count;

    // Pending orders count
    const pendingResult = await db
      .select({ count: count() })
      .from(order)
      .where(eq(order.status, "pending"));
    const pendingOrders = pendingResult[0].count;

    // Rabat zone orders count (delivered only)
    const rabatResult = await db
      .select({ count: count() })
      .from(delivery)
      .innerJoin(order, eq(delivery.orderId, order.id))
      .where(sql`${delivery.zone} = 'rabat' AND ${order.status} = 'delivered'`);
    const rabatOrders = rabatResult[0].count;

    // Calculate previous month stats for comparison
    const now = new Date();
    const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Last month total orders
    const lastMonthOrdersResult = await db
      .select({ count: count() })
      .from(order)
      .where(
        sql`${order.createdAt} >= ${
          firstDayLastMonth.toISOString().split("T")[0]
        } 
        AND ${order.createdAt} <= ${
          lastDayLastMonth.toISOString().split("T")[0]
        }`
      );
    const lastMonthOrders = lastMonthOrdersResult[0].count;

    // Last month revenue (delivered orders only)
    const lastMonthRevenueResult = await db
      .select({
        totalRevenue: sql<number>`COALESCE(SUM(${order.totalCost}), 0)`,
      })
      .from(order)
      .where(
        sql`${order.createdAt} >= ${
          firstDayLastMonth.toISOString().split("T")[0]
        } 
        AND ${order.createdAt} <= ${
          lastDayLastMonth.toISOString().split("T")[0]
        }
        AND ${order.status} = 'delivered'`
      );

    const lastMonthFeesResult = await db
      .select({
        totalFees: sql<number>`COALESCE(SUM(${delivery.fees}), 0)`,
      })
      .from(delivery)
      .innerJoin(order, eq(delivery.orderId, order.id))
      .where(
        sql`${order.createdAt} >= ${
          firstDayLastMonth.toISOString().split("T")[0]
        } 
        AND ${order.createdAt} <= ${
          lastDayLastMonth.toISOString().split("T")[0]
        }
        AND ${order.status} = 'delivered'`
      );

    const lastMonthRevenue =
      Number(lastMonthRevenueResult[0].totalRevenue) +
      Number(lastMonthFeesResult[0].totalFees);

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    const revenueChange = calculateChange(totalRevenue, lastMonthRevenue);
    const ordersChange = calculateChange(totalOrders, lastMonthOrders);

    return {
      success: true,
      data: {
        totalRevenue: totalRevenue.toFixed(2),
        totalOrders,
        deliveredOrders,
        cancelledOrders,
        pendingOrders,
        rabatOrders,
        revenueChange: revenueChange.toFixed(1),
        ordersChange: ordersChange.toFixed(1),
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { success: false, error: "Failed to fetch statistics" };
  }
};
