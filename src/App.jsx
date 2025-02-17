import Home from "./pages/Home/index.jsx"
import LanguageProvider from "./contexts/language.jsx"
import "./contexts/wallet.jsx"

function App() {
    return (
        <LanguageProvider>
            <Home />
        </LanguageProvider>
    )
}

export default App
