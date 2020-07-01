import { useState, useEffect } from 'react'
import { getJwt, isLoggedIn } from '../services/authService'
import * as signalR from '@microsoft/signalr'

const useHub = url => {
  const [hubConnection, setConnection] = useState()
  const [disconnected, setDisconnected] = useState('connecting')

  useEffect(() => {
    if (!isLoggedIn) return

    let timeoutId

    const tryToConnect = async (connection, timeout) => {
      try {
        await connection.start()
        setDisconnected(undefined)
      } catch (_) {
        if (timeout > 30000) {
          setDisconnected('permanent')
        } else {
          setDisconnected('temporary')

          timeoutId = setTimeout(
            () => tryToConnect(connection, timeout * 2),
            timeout
          )
        }
      }
    }

    const setupConnection = async () => {
      const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(url, {
          accessTokenFactory: getJwt,
          transport: signalR.HttpTransportType.WebSockets,
          skipNegotiation: true
        })
        .withAutomaticReconnect()
        .build()

      hubConnection.onreconnecting(() => setDisconnected('temporary'))
      hubConnection.onclose(() => setDisconnected('permanent'))
      hubConnection.onreconnected(() => setDisconnected(undefined))

      tryToConnect(hubConnection, 2000)
      setConnection(hubConnection)
    }

    setupConnection()

    return () => clearTimeout(timeoutId)
  }, [url, setDisconnected, setConnection])

  return { hubConnection, disconnected }
}

export default useHub
