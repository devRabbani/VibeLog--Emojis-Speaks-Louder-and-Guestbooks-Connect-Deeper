export const delay = async (delayTime: number) =>
  await new Promise((resolve) => setTimeout(resolve, delayTime))
