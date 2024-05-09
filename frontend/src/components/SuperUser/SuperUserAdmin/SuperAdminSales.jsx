function SuperAdminSales({ fetchTransitions }) {
  return (
    <div className="superadminsales">
      <div>{Object.keys(fetchTransitions).length}This big</div>
    </div>
  );
}

export default SuperAdminSales;
