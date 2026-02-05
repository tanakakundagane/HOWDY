// import Corporate from "@/components/Corporate";
// import Test from "@/components/Test";



// export default function Home() {
//   return (
//     <main>
//       <Corporate />
//       <Test />
//     </main>
//   );
// }

import { client } from '@/libs/client';
import Corporate from "@/components/Corporate";

export default async function Home() {
  // 1. サーバー側でデータを取得
  const data = await client.get({ endpoint: 'staff' });
  const staffs = data.contents;

  return (
    <main>
      {/* 2. Corporateにデータを渡す */}
      <Corporate staffs={staffs} />
    </main>
  );
}