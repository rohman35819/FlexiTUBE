import withAuth from "../../lib/withAuth";
import LogoutButton from "../../components/LogoutButton";

function Note3() {
  return (
    <div>
      <h1>Halaman Note3, pakai OAuth Auth</h1>
      <LogoutButton authMethod="oauth" />
    </div>
  );
}

export default withAuth(Note3, "oauth");
