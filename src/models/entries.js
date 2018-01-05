import AV from '../../leancloud'

class Entries extends AV.Object {
  get data () {
    return this.get('data')
  }
}

AV.Object.register(Entries, 'ENTRIES')
export default Entries

