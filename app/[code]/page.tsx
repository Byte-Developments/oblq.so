import { redirect } from "next/navigation";
import { UrlService } from "@/lib/services/url.service";

export async function generateStaticParams() {
  return [];
}

async function getUrlByCode(code: string) {
  try {
    return await UrlService.getByCode(code);
  } catch (error) {
    return null;
  }
}

export default async function RedirectPage({ params }: { params: { code: string } }) {
  const url = await getUrlByCode(params.code);

  if (url) {
    redirect(url);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">URL not found</h1>
      <p className="text-muted-foreground mt-2">
        The requested short URL does not exist.
      </p>
    </div>
  );
}