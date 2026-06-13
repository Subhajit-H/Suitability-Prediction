// import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

// const App = () => {
//   return (
//       <QueryClientProvider client={queryClient}>
//       <Example/>
//       </QueryClientProvider>
//   )
// }

// function Example() {
//   const { isPending, error, data } = useQuery({
//     queryKey: ['repoData'],
//     queryFn: async () => {
//       const res = await fetch(
//         'https://api.github.com/repos/TanStack/query'
//       );

//       if (!res.ok){
//         throw new Error('Failed to fetch data');
//       }

//       return res.json();
//     },
//   });

//   if (isPending) return <div>Loading...</div>

//   if (error instanceof Error) {
//     return <div>An error occurred: {error.message}</div>;
//   }

//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <p>{data.description}</p>

//       <strong>👀 {data.subscribers_count}</strong>{' '}
//       <strong>✨ {data.stargazers_count}</strong>{' '}
//       <strong>🍴 {data.forks_count}</strong>
//     </div>
//   )
// }

// export default App