import withAuth from "../../lib/withAuth";
import LogoutButton from "../../components/LogoutButton";

function Note2() {
  return (
    <div>
      <h1>Halaman Note2, pakai Token Auth</h1>
      <LogoutButton authMethod="token" />
    </div>
  );
}

export default withAuth(Note2, "token");
