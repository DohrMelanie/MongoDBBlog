import { redirect } from "next/navigation";

export default function Home() {
  // TODO: redirect to auth when logged out
  redirect('/feed');
}