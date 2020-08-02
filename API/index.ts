import axios, { AxiosResponse } from 'axios'
import { ICommuteItem, ICommutePostOrPutItem } from '@/types'
import endpoint from './endpoint.config'

interface IApiSuccessCode {
  status: number
}

interface IMainDataResponse extends IApiSuccessCode {
  result: ICommuteItem
}

interface ICommuteInsertResponse extends IApiSuccessCode {
  result: ICommutePostOrPutItem
}

interface ICommuteUpdateResponse extends IApiSuccessCode {
  result: ICommuteItem
}

export const getMainData = (): Promise<IMainDataResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await axios.get(
          endpoint.main.request.data()
        )

        if (response.data.status === 2000) {
          resolve(response.data)
        } else {
          reject(response)
        }
      } catch (err) {
        reject(err)
      }
    })()
  })
}

export const postCommute = (
  payload: ICommutePostOrPutItem
): Promise<ICommuteInsertResponse> => {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, `${value}`)
  })

  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await axios.post(
          endpoint.commute.request.insert(),
          formData
        )

        if (response.data.status === 2000) {
          resolve(response.data)
        } else {
          reject(response)
        }
      } catch (err) {
        reject(err)
      }
    })()
  })
}

export const putCommute = (
  id: number,
  payload: ICommutePostOrPutItem
): Promise<ICommuteUpdateResponse> => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        const response: AxiosResponse = await axios.put(
          endpoint.commute.request.update(id),
          payload
        )

        if (response.data.status === 2000) {
          resolve(response.data)
        } else {
          reject(response)
        }
      } catch (err) {
        reject(err)
      }
    })()
  })
}
