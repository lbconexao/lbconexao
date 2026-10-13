import { HashRouter, Routes, Route } from 'react-router-dom';
import Hub from './pages/Hub';
import Saude from './pages/Saude';
import Dev from './pages/Dev';
import Store from './pages/Store';
import Contact from './pages/Contact';
import { About, Solutions, Portfolio, Product, Privacy, LegacyAccess, NotFound } from './pages/Institutional';
import SharedHeader from './components/SharedHeader';
import SharedFooter from './components/SharedFooter';
import RouteEffects from './components/RouteEffects';
import './index.css';
import './visual-v3.css';
export default function App(){return <HashRouter><RouteEffects/><SharedHeader/><main id="conteudo" tabIndex={-1}><Routes><Route path="/" element={<Hub/>}/><Route path="/dev" element={<Dev/>}/><Route path="/saude" element={<Saude/>}/><Route path="/store" element={<Store/>}/><Route path="/sobre" element={<About/>}/><Route path="/solucoes" element={<Solutions/>}/><Route path="/portfolio" element={<Portfolio/>}/><Route path="/dev/produtos/:slug" element={<Product/>}/><Route path="/contato" element={<Contact/>}/><Route path="/privacidade" element={<Privacy/>}/><Route path="/login" element={<LegacyAccess/>}/><Route path="/admin" element={<LegacyAccess/>}/><Route path="*" element={<NotFound/>}/></Routes></main><SharedFooter/></HashRouter>;}
