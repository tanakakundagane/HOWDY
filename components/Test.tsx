import { client } from '@/libs/client';
import StaffClient from './StaffClient'; // あとで作る表示用コンポーネント

export default async function Test() {
  // サーバー側で安全にデータを取得（APIキーはブラウザに漏れない）
  const data = await client.get({ endpoint: 'staff' });
  const staffs = data.contents;

  // 取得したデータを、表示専用のコンポーネントに渡す
  return <StaffClient staffs={staffs} />;
}