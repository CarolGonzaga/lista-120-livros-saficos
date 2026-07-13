import { useState, useMemo } from 'react'
import booksData from './data/books.json'
import './index.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')
  const [monthFilter, setMonthFilter] = useState('')

  // Extrair autores únicos para o select
  const uniqueAuthors = useMemo(() => {
    const authors = booksData.map(b => b.autora).filter(Boolean)
    return [...new Set(authors)].sort((a, b) => a.localeCompare(b))
  }, [])

  // Meses ordenados
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  // Filtrar os livros com base nos critérios
  const filteredBooks = useMemo(() => {
    return booksData.filter(book => {
      const matchSearch = book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      const matchAuthor = authorFilter ? book.autora === authorFilter : true
      const matchMonth = monthFilter ? book.mes === monthFilter : true
      return matchSearch && matchAuthor && matchMonth
    })
  }, [searchTerm, authorFilter, monthFilter])

  const handleBuyClick = (book) => {
    // Dispara evento para o Google Analytics (GA4) se estiver configurado
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_comprar', {
        event_category: 'ecommerce',
        book_id: book.id,
        book_title: book.titulo,
        book_author: book.autora
      });
    }
  };

  return (
    <>
      <div className="app-container">
        <header className="header">
        <a href="https://lendosaficos.com.br" className="logo-link">
          <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Lendo Sáficos Logo" className="logo" />
        </a>
        <h1>120 livros sáficos lançados em 2026</h1>
      </header>

      <main>
        <div className="filters-container">
          <input
            type="text"
            className="filter-input"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="filter-input"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          >
            <option value="">Todas as Autoras</option>
            {uniqueAuthors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
          <select 
            className="filter-input"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          >
            <option value="">Todos os Meses</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <div className="books-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <div key={book.id} className="book-card">
                <div className="book-tag">{book.lancamento}</div>
                <div className="book-cover-container">
                  {book.capa ? (
                    <img 
                      src={book.capa.startsWith('http') ? book.capa : `${import.meta.env.BASE_URL}${book.capa.startsWith('/') ? book.capa.slice(1) : book.capa}`} 
                      alt={`Capa do livro ${book.titulo}`} 
                      className="book-cover" 
                      loading="lazy" 
                    />
                  ) : (
                    <div style={{ color: '#fff', padding: '1rem', textAlign: 'center' }}>Sem Capa</div>
                  )}
                </div>
                <div className="book-info">
                  <h2 className="book-title">{book.titulo}</h2>
                  <div className="book-divider">
                    <span className="book-divider-icon">★</span>
                  </div>
                  <h3 className="book-author">{book.autora}</h3>
                  <div className="book-month">Lançamento em {book.mes}</div>
                  <a 
                    href={book.link || '#'} 
                    target={book.link ? "_blank" : "_self"} 
                    rel="noopener noreferrer"
                    className="buy-button"
                    style={{ 
                      pointerEvents: book.link ? 'auto' : 'none', 
                      opacity: book.link ? 1 : 0.6 
                    }}
                    onClick={(e) => {
                      if (!book.link) {
                        e.preventDefault();
                      } else {
                        handleBuyClick(book);
                      }
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    {book.link ? 'Comprar' : 'Indisponível'}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              Nenhum livro encontrado com esses filtros. Tente ajustar sua busca!
            </div>
          )}
        </div>
      </main>

      </div>

      <footer className="footer">
        <p style={{ marginBottom: '0.5rem' }}>&copy; 2026 Lendo Sáficos. Todos os direitos reservados.</p>
        <p>Desenvolvido por <a href="https://carolgonzaga.site/" target="_blank" rel="noopener noreferrer">CarolGonzaga</a></p>
      </footer>
    </>
  )
}

export default App
