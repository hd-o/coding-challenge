import userEvent from '@testing-library/user-event'
import { find } from './find'

export const click = async (id: string): Promise<void> => {
  await userEvent.click(await find(id))
}
