export const BACKEND = "http://localhost:4000"

const totalCustomizado = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Exibindo { from } de { to } de um total de { size } registros
    </span>
  );

export const opcoesPaginacao = {
    paginationSize: 5,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'Primeiro',
    prePageText: 'Anterior',
    nextPageText: 'Próximo',
    lastPageText: 'Último',
    nextPageTitle: 'Primeira Página',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Próxima Página',
    lastPageTitle: 'Última Página',
    showTotal: true,
    paginationTotalRenderer: totalCustomizado,
    disablePageTitle: true  }

const config = { BACKEND, opcoesPaginacao}

export default config