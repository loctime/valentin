import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

const DEVICE_ID_KEY = "valentin-device-id"
const DEVICE_ID_PREFIX = "valentin-device-"

function randomId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID().slice(0, 8)
  }
  return Math.random().toString(36).slice(2, 10)
}

export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return ""
  try {
    const stored = localStorage.getItem(DEVICE_ID_KEY)
    if (stored) return stored
    const id = `${DEVICE_ID_PREFIX}${randomId()}`
    localStorage.setItem(DEVICE_ID_KEY, id)
    return id
  } catch {
    return `${DEVICE_ID_PREFIX}${randomId()}`
  }
}

export interface InvitationResponsePayload {
  nombre: string
  telefono: string | null
  selecciones: string[]
  propuestaExtra: string | null
}

export async function saveInvitationResponse(
  payload: InvitationResponsePayload
): Promise<void> {
  const firestore = db()
  const deviceId = getOrCreateDeviceId()

  await addDoc(collection(firestore, "apps", "valentin", "respuestas"), {
    nombre: payload.nombre.trim(),
    telefono: payload.telefono?.trim() || null,
    selecciones: payload.selecciones,
    propuestaExtra: payload.propuestaExtra,
    createdAt: serverTimestamp(),
    deviceId,
  })
}
