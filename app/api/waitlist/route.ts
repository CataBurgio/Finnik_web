import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { nombre, whatsapp } = await req.json();

  if (!nombre?.trim() || !whatsapp?.trim()) {
    return NextResponse.json({ error: "Campos requeridos" }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from("waitlist")
    .insert({ nombre: nombre.trim(), whatsapp: whatsapp.trim() });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
