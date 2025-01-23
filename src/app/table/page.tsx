import UserTable from "@/components/UserTable";
import MyNavbar from "@/components/MyNavbar";
export default function TablePage() {
  return (
    <div className="container mx-auto p-4">
        <MyNavbar/>
        <UserTable />
    </div>
  );
}