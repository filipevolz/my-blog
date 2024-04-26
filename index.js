import express from 'express'
import bodyParser from 'body-parser';
import generateUniqueId from 'generate-unique-id';

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const currentDate = new Date().toLocaleDateString();

let initialData = [
    { id: generateUniqueId(), title: 'O Poder do BTC', description: "Explore o impacto revolucionário da primeira criptomoeda do mundo.", content: "O Bitcoin (BTC) é a primeira e mais conhecida criptomoeda do mundo, criada por uma pessoa ou grupo sob o pseudônimo de Satoshi Nakamoto em 2009. Desde então, o Bitcoin tem desempenhado um papel transformador no mundo das finanças e da tecnologia, desafiando as estruturas tradicionais e promovendo a liberdade financeira.Uma das características mais notáveis ​​do Bitcoin é sua natureza descentralizada, o que significa que não é controlado por nenhum governo ou instituição financeira centralizada. Isso confere aos usuários do Bitcoin um alto nível de liberdade e autonomia sobre seu próprio dinheiro, permitindo transações rápidas e seguras em qualquer lugar do mundo.Além disso, o Bitcoin serve como uma reserva de valor digital, semelhante ao ouro, protegendo os investidores contra a inflação e a desvalorização das moedas fiduciárias. Seu fornecimento limitado de 21 milhões de bitcoins também o torna uma forma escassa de dinheiro, o que pode potencialmente aumentar seu valor ao longo do tempo.No entanto, o verdadeiro poder do Bitcoin vai além de seu valor como uma forma de dinheiro digital. O Bitcoin também é uma ferramenta para promover a inclusão financeira, permitindo que pessoas em regiões subdesenvolvidas ou sem acesso a serviços bancários tradicionais participem da economia global.Além disso, o Bitcoin tem o potencial de desafiar a hegemonia financeira dos grandes bancos e instituições financeiras, oferecendo uma alternativa transparente e descentralizada ao sistema financeiro tradicional.Em resumo, o Bitcoin é muito mais do que apenas uma criptomoeda. É um símbolo de liberdade, autonomia e resistência, que continua a inspirar milhões de pessoas em todo o mundo a desafiar o status quo e construir um futuro financeiro mais justo e inclusivo para todos.", date: currentDate},
    { id: generateUniqueId(), title: 'Tudo sobre (ETH)', description: "Aprofunde-se no mundo da segunda maior criptomoeda do mercado.",content: "O Ethereum (ETH) é uma plataforma blockchain descentralizada que permite a criação e execução de contratos inteligentes e aplicativos descentralizados (DApps). Lançado em 2015 por Vitalik Buterin e uma equipe de desenvolvedores, o Ethereum rapidamente se tornou a segunda maior criptomoeda em capitalização de mercado, atrás apenas do Bitcoin.Ao contrário do Bitcoin, que é projetado principalmente como uma moeda digital, o Ethereum é uma plataforma que visa facilitar uma ampla gama de serviços descentralizados, incluindo finanças, jogos, identidade digital e muito mais. Isso é possível graças à sua linguagem de programação Turing-completa chamada Solidity, que permite aos desenvolvedores criar contratos inteligentes personalizados.Os contratos inteligentes são programas autoexecutáveis ​​que operam na blockchain Ethereum e automatizam a execução de acordos digitais, sem a necessidade de intermediários. Eles são fundamentais para a funcionalidade e a inovação dentro do ecossistema Ethereum, impulsionando o crescimento de aplicativos descentralizados (DApps) e DeFi (finanças descentralizadas).Além disso, o Ethereum está passando por uma importante atualização chamada Ethereum 2.0, que visa melhorar a escalabilidade, segurança e sustentabilidade da rede. Essa atualização é esperada para trazer benefícios significativos, como transações mais rápidas e taxas mais baixas, tornando o Ethereum ainda mais robusto e preparado para o futuro.Em resumo, o Ethereum desempenha um papel fundamental na revolução da tecnologia blockchain e continua a ser uma plataforma de escolha para desenvolvedores e inovadores que buscam criar aplicativos descentralizados e transformar indústrias inteiras.", date: currentDate},
    { id: generateUniqueId(), title: 'O que são CriptoAtivos', description: "Descubra o significado e o potencial dos criptoativos neste guia introdutório.", content:"Os criptoativos, também conhecidos como criptomoedas ou moedas digitais, são ativos digitais baseados em tecnologia blockchain. Eles representam uma forma de dinheiro digital que utiliza criptografia para garantir transações seguras e verificáveis, sem a necessidade de intermediários como bancos ou governos.Embora o Bitcoin seja a criptomoeda mais conhecida, existem milhares de criptoativos diferentes, cada um com suas próprias características e funcionalidades únicas. Alguns são projetados como formas alternativas de dinheiro, enquanto outros são criados para facilitar contratos inteligentes, aplicativos descentralizados (DApps) e muito mais.Uma das principais vantagens dos criptoativos é sua natureza descentralizada, o que significa que eles não são controlados por nenhuma autoridade centralizada. Isso confere aos usuários um alto nível de liberdade e autonomia sobre seus próprios ativos, além de proporcionar transações rápidas e eficientes em escala global.No entanto, os criptoativos também enfrentam desafios significativos, como volatilidade de preços, regulamentação governamental e preocupações com segurança. Como resultado, é importante que os investidores e usuários compreendam os riscos e recompensas associados aos criptoativos antes de se envolverem com eles.Apesar dos desafios, o potencial dos criptoativos para revolucionar o sistema financeiro global e promover a inclusão financeira é imenso. À medida que mais pessoas e empresas adotam criptoativos em suas operações diárias, é provável que seu impacto continue a crescer e a transformar a maneira como pensamos sobre dinheiro e transações financeiras.", date: currentDate},
]

app.get("/home", (req, res) => {
    res.render("index.ejs", { posts: initialData});
});

app.get("/addPost", (req, res) => {
    res.render("addPost.ejs")
})

app.post("/submit", (req, res) => {
    const newPost = { id: generateUniqueId(), title: req.body.title, description: req.body.description, content: req.body.content, date: currentDate}
    initialData.push(newPost);
    res.render("index.ejs", {posts: initialData});
})

app.get("/:postId", (req, res) => {
    const postId = req.params.postId;
    const post = initialData.find(post => post.id === postId);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("post.ejs", { post: post });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}/home`);
});
