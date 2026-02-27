import { NextResponse } from "next/server";
import { getAuthPayload } from "@/lib/auth";
import { findMany, insertOne } from "@/lib/mongodb";

type ItemInput = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export async function POST(request: Request) {
  try {
    const user = getAuthPayload();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { items?: ItemInput[] };
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { message: "Order must include at least one item." },
        { status: 400 }
      );
    }

    const subtotal = body.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const id = await insertOne("orders", {
      userId: user.userId,
      items: body.items,
      subtotal,
      paymentStatus: "pending",
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({
      order: {
        id: String(id),
        subtotal,
        paymentStatus: "pending"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = getAuthPayload();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const orders = await findMany("orders", { userId: user.userId }, { createdAt: -1 });

    return NextResponse.json({
      orders: orders.map((order) => ({
        id: String(order._id),
        subtotal: Number(order.subtotal),
        paymentStatus: order.paymentStatus,
        items: order.items,
        createdAt: order.createdAt
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to fetch orders" },
      { status: 500 }
    );
  }
}
