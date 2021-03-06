// Création du client ZetaPush
const client = new ZetaPush.Client({
  sandboxId: prompt('Set your sandbox id'),
  authentication() {
    return ZetaPush.Authentication.simple({
      login: 'demo',
      password: 'demo'
    })
  }
})
const api = client.createService({
  Type: ZetaPush.services.Macro,
  listener: {
    listFiles({ data: { result } }) {
      const cards = result.listing.entries.content
      $cards.textContent=(JSON.stringify(cards))
    }
  }
})
// Event de connexion
client.onConnectionEstablished(() => {
  api.call({ name: 'listFiles' })
  $status.textContent=('signal_wifi_4_bar')
})
client.onConnectionClosed(() => {
  $status.textContent=('signal_wifi_off')
})
// Connexion au backend
client.connect()
