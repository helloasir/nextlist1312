import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getStaticPaths() {
  const totalPages = 10; // Adjust based on your data
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { pageNumber: (i + 1).toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const pageNumber = parseInt(params.pageNumber);
  const filePath = path.join(process.cwd(), `public/data/webs_${pageNumber}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { props: { data } };
}

export default function Page({ data }) {
  return (
    <div>
      <h1>Page</h1>
      <ul>
        {data.slice(0, 1000).map((entry) => (
          <li key={entry.Rank}>
            <Link href={`/domain/${entry.Domain}`}>{entry.Domain}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
