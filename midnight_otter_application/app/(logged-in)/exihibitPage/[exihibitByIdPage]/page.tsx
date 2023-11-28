export default function Page({ params }: { params: { exihibitByIdPage: string } }) {
  return <div>My Post: {params.exihibitByIdPage}</div>;
}
