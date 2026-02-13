import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface InvitationResponsePayload {
  selectedOptions: string[]
  customMessage: string
}

export async function saveInvitationResponse(
  payload: InvitationResponsePayload
): Promise<void> {
  const firestore = db()
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : ""

  await addDoc(collection(firestore, "apps", "valentin", "respuestas"), {
    selectedOptions: payload.selectedOptions,
    customMessage: payload.customMessage,
    createdAt: serverTimestamp(),
    userAgent,
  })
}
