import { useMantle } from "..";

const PlanContainer = ({ plan }) => {
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px', margin: '1rem' }}>
      <h2>{plan.name}</h2>
      <p>{plan.description}</p>
      <p>Price: ${plan.amount}</p>
    </div>
  );
};

const Plans = ({ plans }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {plans.map((plan) => (
        <PlanContainer key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

export const AuthenticatedPage = () => {
  const { plans, error, loading, mantleClient, customer } = useMantle();

  return (
    <div>
      <h1>Authenticated Page</h1>
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading && <div>Loading...</div>}
        {!loading && (error || plans?.length == 0) && (
          <div style={{ color: 'red' }}>appId and customerApiToken are required</div>
        )}
        {!loading && !error && (
          <Plans plans={plans} />
        )}
      </div>
    </div>
  );
};
