// Asynchronous sleep function, accept an argument in milliseconds
export async function  sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}