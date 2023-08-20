import PageHeader from "@/components/ui/page-header";

export default async function NewsPage() {
  return (
    <section className="w-full px-16 py-20">
      <PageHeader
        title="News"
        subtitle="Übersicht über die News der Website"
      ></PageHeader>
    </section>
  );
}
