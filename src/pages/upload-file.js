import Header from "../components/header"
import Footer from "../components/footer"
import WalletConnect from "./wallet"
import "./styles/upload-file.css"
import "./styles/connectWallet.css"


export default function uploadFile() {
    return (
        <div className="home">
            <Header />
            <WalletConnect />
            <h1>Upload a File Page</h1>

            <div className = "upload-file">
                <div className = "row">
                    <div className = "col-sm">
                    <h2>Upload File</h2>
                        <input type='file' className='custom-file-input' />
                        <button>Upload</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}