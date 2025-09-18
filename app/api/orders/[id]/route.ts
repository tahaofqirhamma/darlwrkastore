import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id
    const body = await request.json()

    // Validate status if provided
    if (body.status && !["en attente", "livré", "annulé"].includes(body.status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 })
    }

    // Here you would typically update in database
    console.log(`[v0] Updating order ${orderId}:`, body)

    return NextResponse.json({
      success: true,
      message: "Commande mise à jour avec succès",
      orderId: orderId,
    })
  } catch (error) {
    console.error("[v0] Error updating order:", error)
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 })
  }
}

// Delete order
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id

    // Here you would typically delete from database
    console.log(`[v0] Deleting order ${orderId}`)

    return NextResponse.json({
      success: true,
      message: "Commande supprimée avec succès",
    })
  } catch (error) {
    console.error("[v0] Error deleting order:", error)
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 })
  }
}
