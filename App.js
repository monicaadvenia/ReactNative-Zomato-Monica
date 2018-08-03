import React, { Component } from 'react';
import { Image } from 'react-native';
import { 
  Container, 
  Header, 
  Item, 
  Input, 
  Icon, 
  Content, 
  Button, 
  Text, 
  Card, 
  CardItem, 
  Thumbnail, 
  Left, 
  Body, 
  Right, 
  Footer, 
  FooterTab 
} from 'native-base';

import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      search: 'Belum terisi',
      resto: ['Coba lagi'],
      namaResto: '',
      kotaResto: '',
      hargaResto: '',
      alamatResto: '',
    }
  }

  restoSearch = () => {
    var url = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;

    var config = {
      headers:{'user-key':'5c93a9595788cb334cb5832209121070'}
    };

    axios.get(url, config).then((ambilData)=>{
      this.setState({
        resto: ambilData.data.restaurants
      })
    })

    console.log('Muahaha');
    console.log(this.state.search);
    console.log(this.state.resto);
  }

  render() {
    const data = this.state.resto.map((item, index)=>{

      var restoThumbnail = item.restaurant.thumb;
      var restoNama = item.restaurant.name;
      var restoKota = item.restaurant.location.city;
      var restoHarga = item.restaurant.average_cost_for_two;
      var restoAlamat = item.restaurant.location.address;
      return 
      <Card key={index}>

        <CardItem>
          <Left>
            <Thumbnail source={{uri: restoThumbnail}}/>
            <Body>
              <Text>{restoNama}</Text>
              <Text note>{restoKota}}</Text>
            </Body>
          </Left>
          <Right>
            <Button transparent>
              <Text>Rp {restoHarga}</Text>
            </Button>
          </Right>
        </CardItem>

        <CardItem cardBody>
          <Image source={{uri: restoThumbnail}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>

        <CardItem>
          <Body>
            <Button transparent>
            <Icon active name="thumbs-up"/>
            <Text>{restoAlamat}</Text>
          </Button>
          </Body>
        </CardItem>

      </Card>

    }
  )

    return (
    <Container>

      <Header searchBar rounded>
        <Item>
          <Icon name="search" />
          <Input placeholder='Cari menu makanan...' onChangeText={(input) => this.setState({search:input})} />
        </Item>
      </Header>
       
      <Content>
        {/* <Button block warning onPress={()=>{this.setState({search:'hahaha'})}}> */}
        <Button block warning onPress={()=> {this.restoSearch()}}>
          <Text>Lihat Daftar Resto</Text>
        </Button>

        {data}
        {/* <Card>

          <CardItem>
            <Left>
              <Thumbnail source={{uri:'https://pbs.twimg.com/media/DAwp14OUIAEQYvx.jpg'}}/>
              <Body>
                <Text>{this.state.search}</Text>
                <Text note>Tangerang</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent>
                <Text>Rp 60000</Text>
              </Button>
            </Right>
          </CardItem>

          <CardItem cardBody>
            <Image source={{uri:'https://pbs.twimg.com/media/DAwp14OUIAEQYvx.jpg'}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>

          <CardItem>
            <Body>
              <Button transparent>
              <Icon active name="thumbs-up"/>
              <Text>Jl. Borobudur Raya No. 35 Perum II Karawaci (Sebelah Toko ABC, seberang Indomaret)</Text>
            </Button>
            </Body>
          </CardItem>

        </Card> */}

      </Content>

      <Footer>
        <FooterTab>
          <Button full>
            <Text>Zomato © 2018</Text>
          </Button>
        </FooterTab>
      </Footer>

    </Container>
    );
  }
}

export default App;