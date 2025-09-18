import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "clientName",
      "phone",
      "address",
      "zone",
      "quantity",
      "size",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        );
      }
    }

    // Validate zone (must be "Rabat" or "Hors Rabat")
    if (!["Rabat", "Hors Rabat"].includes(body.zone)) {
      return NextResponse.json(
        { error: 'La zone doit être "Rabat" ou "Hors Rabat"' },
        { status: 400 }
      );
    }

    // Validate size (must be "petit" or "grand")
    if (!["petit", "grand"].includes(body.size)) {
      return NextResponse.json(
        { error: 'La taille doit être "petit" ou "grand"' },
        { status: 400 }
      );
    }

    // Generate order ID
    const orderId = `CMD-${Date.now()}`;

    // Create order object
    const newOrder = {
      id: orderId,
      clientName: body.clientName,
      phone: body.phone,
      address: body.address,
      zone: body.zone,
      quantity: Number.parseInt(body.quantity),
      size: body.size,
      deliveryDate: body.deliveryDate || new Date().toISOString().split("T")[0],
      deliveryTime: body.deliveryTime || "14:00",
      price: body.price || (body.size === "grand" ? 350 : 250), // Default pricing
      status: "en attente",
    };

    // Here you would typically save to database
    // For now, we'll just return success
    console.log("[v0] New order created:", newOrder);

    return NextResponse.json({
      success: true,
      message: "Commande créée avec succès",
      orderId: orderId,
      order: newOrder,
    });
  } catch (error) {
    console.error("[v0] Error creating order:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// Get all orders
export async function GET() {
  try {
    // Here you would typically fetch from database
    // For now, return mock data
    const orders = [
      {
        id: "CMD-001",
        clientName: "Ahmed Benali",
        phone: "+212 6 12 34 56 78",
        address: "123 Rue Mohammed V, Rabat",
        zone: "Rabat",
        quantity: 2,
        size: "petit",
        deliveryDate: "2024-01-15",
        deliveryTime: "14:00",
        price: 450,
        status: "livré",
      },
    ];

    return NextResponse.json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    console.error("[v0] Error fetching orders:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des commandes" },
      { status: 500 }
    );
  }
}
