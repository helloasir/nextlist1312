import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const files = Array.from({ length: 10 }, (_, i) =>
    path.join(process.cwd(), `public/data/webs_${i + 1}.json`)
  );
  const domains = files.flatMap((file) => {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return data.map((entry) => ({ params: { domain: entry.Domain } }));
  });
  return { paths: domains, fallback: false };
}

export async function getStaticProps({ params }) {
  const files = Array.from({ length: 10 }, (_, i) =>
    path.join(process.cwd(), `public/data/webs_${i + 1}.json`)
  );
  const allData = files.flatMap((file) =>
    JSON.parse(fs.readFileSync(file, 'utf8'))
  );
  const domainData = allData.find((entry) => entry.Domain === params.domain);
  return { props: { domainData } };
}

export default function DomainPage({ domainData }) {
  return (
    <div>
      <h1>Domain Details: {domainData.Domain}</h1>
      <p>Rank: {domainData.Rank}</p>
      <p>Data1: {domainData.data1}</p>
      <p>Data2: {domainData.data2}</p>
      <p>Data3: {domainData.data3}</p>
    </div>
  );
}
