

import './App.css'
import Header from './component/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PricingPage from './pages/PricingPage'
import DeveloperSupport from './pages/DeveloperSupport'
import Footer from './component/Footer'
import SponsorPage from './pages/SponsorPage'
import TermsPage from './pages/TermsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ToolListPage from './pages/ToolListPage'
import ConversionFeaturesPage from './pages/ConversionFeaturesPage'
import FaqPage from './pages/FaqPage'
import ExcelToJsonConverter from './pages/ExcelToJsonConverter'
import JsonToExcelConverter from './pages/JsonToExcelConverter'
import CsvToJsonConverter from './pages/CsvToJsonConverter'
import CsvToMarkdownConverter from './pages/CsvToMarkdownConverter'
import CsvToSqlConverter from './pages/CsvToSqlConverter'
import CsvToHtmlTableConverter from './pages/CsvToHtmlTableConverter'
import JsonToYamlConverter from './pages/JsonToYamlConverter'
import HtmlToMarkdownConverter from './pages/HtmlToMarkdownConverter'
import QrCodeGenerator from './pages/QrCodeGenerator'
import QrCodeScanner from './pages/QrCodeScanner'
import BarcodeTool from './pages/BarcodeTool'
import Base64ToText from './pages/Base64ToText'
import TextEncoderTool from './pages/TextEncoderTool'


function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/pricing' element={<PricingPage/>}/>
            <Route path='/developer-support' element={<DeveloperSupport/>}/>
                  <Route path='/sponsor' element={<SponsorPage/>}/>
<Route path='/terms' element={<TermsPage/>}/>
<Route path='/privacy' element={<PrivacyPolicyPage/>}/>
<Route path='/about' element={<AboutPage/>}/>
<Route path='/contact' element={<ContactPage/>}/>
<Route path='/all-convertion-tool' element={<ToolListPage/>}/>
<Route path='/all-convertion-features' element={<ConversionFeaturesPage/>}/>
<Route path='/Faq' element={<FaqPage/>}/>
{/* pages */}
<Route path='/excel-to-json' element={<ExcelToJsonConverter/>}/>
<Route path='/json-to-excel' element={<JsonToExcelConverter/>}/>
<Route path='/csv-to-json' element={<CsvToJsonConverter/>}/>

<Route path='/csv-to-markdown' element={<CsvToMarkdownConverter/>}/>
<Route path='/csv-to-sql' element={<CsvToSqlConverter/>}/>

<Route path='/csv-to-html' element={<CsvToHtmlTableConverter/>}/>
<Route path='/json-to-yaml' element={<JsonToYamlConverter/>}/>
<Route path='/html-to-markdown' element={<HtmlToMarkdownConverter/>}/>
<Route path='/qr-generator' element={<QrCodeGenerator/>}/>
<Route path='/qr-scanner' element={<QrCodeScanner/>}/>
<Route path='/barcode-to-text' element={<BarcodeTool/>}/>
<Route path='/base64-decode' element={<Base64ToText/>}/>
<Route path='/text-encoder' element={<TextEncoderTool/>}/>

    </Routes>
    <Footer/>
    </>
  )
}

export default App 