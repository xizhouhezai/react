import React, { Component } from 'react'
import { Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

const emojis = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀'.split(' ').filter(v => v).map(v => ({
  text: v
}))
class Emoji extends Component {
  static propTypes = {
    selectEmoji: PropTypes.func
  }
  componentDidMount() {
    setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		}, 0)
  }
  render() {
    return (
      <div style={{fontSize: 20}}>
        <Grid
          data={emojis}
          columnNum={9}
          carouselMaxRow={4}
          isCarousel={true}
          onClick={(el) => this.props.selectEmoji(el)}
        />
      </div>
    )
  }
}

export default Emoji