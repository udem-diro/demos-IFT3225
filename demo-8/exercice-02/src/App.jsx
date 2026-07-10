import './App.css';
import Layout from "./components/Layout.jsx";
import AccueilPage from "./pages/AccueilPage.jsx";

// Utilisateur connecté simulé.
const utilisateurConnecte = { id: "u1", name: "Alex", role: "admin" };

export default function App() {
    return (
        <Layout user={utilisateurConnecte}>
            <AccueilPage />
        </Layout>
    );
}