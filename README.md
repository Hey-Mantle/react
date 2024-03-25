
# Mantle App API React Client and Components

A [react](https://react.dev/) interface for interacting with the [Mantle](https://heymantle.com) App API.

## Installation

You can install the Mantle react package using npm:


```bash
$ npm install @heymantle/react
```

## Usage

Include the `MantleProvider` react context somewhere near the root of your component tree, after you have access to your customer / shop data, you'll need the stored Mantle customer token from the `identify` request you did server-side. For example:

```js
import { MantleProvider } from "@heymantle/react";

const App = (Component) => {
  const [shop, setShop] = useState();

  const fetchShop = async () => {
    const response = await fetch('/api/shop');
    setShop(await response.json());
  }

  useEffect(() => {
    fetchShop();
  }, [])

  if (!shop) {
    return <Loading />;
  }

  ReactDOM.render(
    <BrowserRouter>
      <AppFrame host={host}>
        <MantleProvider
          appId={process.env.MANTLE_APP_ID}
          customerApiToken={shop.mantleApiToken}
          apiUrl={process.env.MANTLE_API_URL}
        >
          <Component />
        </MantleProvider>
      </AppFrame>
    </BrowserRouter>,
    document.getElementById("app-container")
  );
};
```

Furthur down the stack you can then use the `useMantle` hook for most data and operations, for example:

```js
import { useMantle } from "@heymantle/react";

const HomePage = () => {
  const { customer, subscription, plans, subscribe, cancelSubscription, pushEvent } = useMantle();

  useEffect(() => {
    pushEvent({
      eventName: 'page_view',
      properties: {
        path: window.location.href,
      },
    });
  }, [window.location]);

  return (
    <div>
      {customer.subscription ? (
        <div>
          <span>You're currently susbcribed to: {customer.subscription.plan.name}</span>
          <button
            onclick={async () => {
              await cancelSubscription();
            }}
          >
            Cancel subscription
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
        {plans.map((plan) => (
          <div>
            <span><strong>{plan.name}</strong></span>
            <span>${plan.amount}</span>
            <button
              onclick={async () => {
                const subscription = await subscribe({ planId: plan.id });
                open(subscription.confirmationUrl, "_top");
              }}
              Subscribe
            </button>
          </div>
        )}
      )}
    </div>
  )
};
```

This example uses a very simple and vanilla plan list rendering, check out our [drop-in components](https://heymantle.com/components) for usable UI components.

## Documentation

Documentation is available at [https://heymantle.com/docs/surfacing-mantle-data](https://heymantle.com/docs/surfacing-mantle-data).
