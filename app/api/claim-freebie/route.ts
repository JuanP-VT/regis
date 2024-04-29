import { getServerSession } from "next-auth";
import { OPTIONS } from "../auth/[...nextauth]/nextAuthOptions";
import { NextResponse } from "next/server";
import { StoreItemModel } from "@/lib/models/storeItem";
import dbConnect from "@/lib/dbConnect";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import { UserModel } from "@/lib/models/user";
export async function POST(req: Request) {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  //Get and validate freebie id from body
  const body = await req.json();
  const { itemId } = body;
  if (!itemId) {
    return NextResponse.json({ message: "Missing Item Id" }, { status: 400 });
  }
  //Get freebie from database

  try {
    await dbConnect();
    const freebie = (await StoreItemModel.findById(itemId)) as StoreItemDB_ID;

    //Check that item is indeed a freebie
    if (freebie.price !== 0 && freebie.discountPercentage !== 100) {
      return NextResponse.json(
        { message: "El objecto no es un freebie" },
        { status: 400 },
      );
    }
    //Check that user has not claimed freebie before
    const hasClaimed = session.user.freebies.includes(freebie.fileName);
    if (hasClaimed) {
      return NextResponse.json(
        { message: "Ya haz reclamado este freebie" },
        { status: 400 },
      );
    }
    //Add freebie to user's freebies
    const newFreebies = [...session.user.freebies, freebie.fileName];
    await UserModel.findByIdAndUpdate(session.user._id, {
      freebies: newFreebies,
    });
    return NextResponse.json({ message: "Freebie reclamado!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error Connecting To Database" },
      { status: 500 },
    );
  }
}
