const fs = require('fs');
const path = require('path');

const tsvData = `ID	Ordem	CAPA	TÍTULO	AUTORA	LANÇAMENTO	LINK
90	1		Bala no Alvo, Dente de Leão	Giu Domigues	09/02/2026	https://link.amazon/B0fOmriI4
21	2		A Guarda-Costas – Parte 1	G.B. Baldassari	25/02/2026	https://link.amazon/B00pIQK27
97	3		O Coração Envenenado	Kalynn Bayron	02/01/2026	https://link.amazon/B0cprfR2p
39	4		Dias de Princesa	Englantine	10/03/2026	https://link.amazon/B0eFVNYS7
129	5		Ponto Sem Nó	Ingrid Paranhos	04/07/2026	https://link.amazon/B0dp9fLoU
77	6		Ninguém Especial	Sophie Gonzales	10/03/2026	https://link.amazon/B00sjGN9f
80	7		Vai Sonhando, Ramona Riley	Ashley Herring Blake	03/03/2026	https://link.amazon/B02QDmvjN
83	8		Um Lugar Para Nós	Hayley Kiyoko	02/04/2026	https://link.amazon/B0bP12f0V
127	9		Aliança em Campo	Nick Martins	19/06/2026	https://link.amazon/B0dk05RlI
6	10		A Beira de Nós	Laila Zago	28/05/2026	https://link.amazon/B0cpBzCl8
76	11		As Três Tarefas de Cristina Ribeiro de Castro	Laura Pohl	15/06/2026	https://link.amazon/B0araZcBr
12	12		Um Segundo Para Sempre	Camilla Giordanno	03/01/2026	https://link.amazon/B06Pmxh3P
102	13		Todas as Verdades Que eu Não Te Disse	D. Barreto	27/02/2026	https://link.amazon/B0e8t8hAS
95	14		Overdrive	Agatha Menezes	07/03/2026	https://link.amazon/B08gwTqJY
16	15		Fogo Cruzado	Carol Barra	05/02/2026	https://link.amazon/B05e0S1w6
8	16		O Livro de Sangue & Rosas	Annie Summerlee	30/03/2026	https://link.amazon/B0dK7CC9W
53	17		O Encontro dos Sóis	Carol Barra	09/05/2026	https://link.amazon/B05OGzIbo
31	18		Desarmonia	Raquel Alves	06/03/2026	https://link.amazon/B0ezrvSdU
75	19		Volte Para a Superfície	Victoria Mendes	01/02/2026	https://link.amazon/B0frmoA5h
78	20		Sem Palavra de Segurança	Leila Venturini	15/02/2026	https://link.amazon/B02x0cK1A
55	21		Proibido se Apaixonar: De Novo	V. S. Vilela	01/05/2026	https://link.amazon/B0iAAve8r
126	22		Patinando Até Você	Agatha Menezes	14/06/2026	https://link.amazon/B0bwUnsaF
47	23		Além das Câmeras	Gina Milbradt	04/04/2026	https://link.amazon/B0j5XSI2W
63	24		Monte Aurora	Ana Winter	28/06/2026	https://link.amazon/B0i2qoNMV
20	25		Todas as Nossas Estações	Andremis	23/02/2026	https://link.amazon/B06H4KHh8
19	26		Um Acordo de Dois Corações	Zey Shelsea, Yas Oliveira	19/02/2026	https://link.amazon/B012lqkNX
11	27		Posso Ser Ela?	Ve Dias	05/01/2026	https://link.amazon/B096v5HVc
87	28		Amor Expresso	Jéssica Batista	25/01/2026	https://link.amazon/B02VKSiPn
100	29		Presas	Rebecca Nobre	27/02/2026	https://link.amazon/B0bLQk2zF
52	30		Fora de Campo	D. Barreto	07/05/2026	https://link.amazon/B0iUBGNSC
123	31		Até Que os Mortos nos Separem	Marina Porteclis e Talita Heusi	28/05/2026	https://link.amazon/B0aN7VL4P
58	32		O Diabo Veste Cor-de-Rosa	Alexandria Bellefleur	27/04/2026	https://link.amazon/B0jeVRdpW
18	33		Cara Wendy	Ann Zhao	30/01/2026	https://link.amazon/B01PW0oBa
125	34		Falha Crítica no Amor	Debora Carvalho	26/05/2026	https://link.amazon/B08l6uBuZ
61	35		Esposa de Mentira	Zey Shelsea	24/05/2026	https://link.amazon/B088Whqk7
15	36		Você Não é Minha	Mar Freitas	05/02/2026	https://link.amazon/B03NqRCXF
35	37		Os 4 Espelhos	Marina Porteclis	14/03/2026	https://link.amazon/B015qlz4A
14	38		Data Vênia	Laura Rodrigues	10/01/2026	https://link.amazon/B09MdlSeo
13	39		A Redenção da Herdeira Arrogante	Lorena Rodrigues 	09/01/2026	https://link.amazon/B0ens2U7x
36	40		Um Combinado Entre Nós	Olívia Pilar		-
121	41		A Escolhida da Deusa	Mariana Rosa	05/05/2026	https://link.amazon/B0grFskyQ
120	42		Matriz em Risco	Evyn Mota	30/04/2026	https://link.amazon/B0e0DeDHO
38	43		Dona do Meu Pecado: Ruína – Parte 1	Fernanda Moser	11/03/2026	https://link.amazon/B0c9eNFTp
104	44		Sistema do Amor	Fabi Caldeira	09/03/2026	https://link.amazon/B0iMjQoIT
65	45		Quebra-Cabeça	Thaynna Desidério	26/06/2026	https://link.amazon/B0h5RqFvT
128	46		Sentença	Meline Aranha	18/06/2026	https://link.amazon/B03N6sfGR
62	47		Cartas para a Pior Garota do Mundo	Evyn Mota	12/06/2026	https://link.amazon/B04msYgOn
59	48		Joanesburgo	Victoria Mendes	23/05/2026	https://link.amazon/B0i8sHXF1
89	49		Nosso Falso Amor	Fernanda Moser	30/01/2026	https://link.amazon/B0ggnNmXH
71	50		Seis é Demais	Lizzy Lesueur	18/04/2026	https://link.amazon/B005xGCmX
81	51		Você é Minha Musa	Liliane Reis	24/06/2026	https://link.amazon/B09e7TQ1s
82	52		Amor Imprevisível	Jess Lim	23/06/2026	https://link.amazon/B05K0X52x
86	53		Como Reconquistar uma Nerd	Madu Oliveira	16/01/2026	https://link.amazon/B0aHyuXcR
9	54		Entre Sombras e Verdades	Debora Carvalho	08/07/2026	https://link.amazon/B0bJcce5l
91	55		3 Meses para Matar ou Amar Você	Neizer Lopes	23/02/2026	https://link.amazon/B0iJEnaPY
56	56		Opostos Contingentes	Fernanda V. 	02/05/2026	https://link.amazon/B01Tr8apD
49	57		Garota de Programa	Rebecca Nobre	16/04/2026	https://link.amazon/B0cqTcwWf
66	58		Às Cegas com Você	Ferrazz	29/06/2026	https://link.amazon/B02lCU0oL
7	59		Flores e Sombras	Daphne F. L. 	28/06/2026	https://link.amazon/B0d56yS92
17	60		O Destino que Roubei do Universo	Juliana Anferoli 	12/01/2026	https://link.amazon/B09QjtPgN
69	61		Olhe Para Mim	Lena M 	15/03/2026	https://link.amazon/B03rbpbak
68	62		Tudo que Eu Não Planejei	G.G. Mazu 	19/06/2026	https://link.amazon/B0dPQk6bS
67	63		Isis	LENA M.	06/06/2026	https://link.amazon/B06ZeGuAo
70	64		She's My Eternity	Valerie Hunter	04/07/2026	https://link.amazon/B0dIHMJNW
2	65		The Popstar's Cowgirl	A. Goswami	10/04/2026	https://link.amazon/B0cZ7vMRO
1	66		Eu Me Rendo E Me Entrego Até Depois Do Fim: Livro 3	Márcia Camargo	03/01/2026	https://link.amazon/B0acHANrN
72	67		Do Avesso da Moda	Fabi Caldeira	29/06/2026	https://link.amazon/B0dSsdiOF
73	68		Até Ela Dizer Sim	Laura Alves	15/05/2026	https://link.amazon/B0j7hDy3G
3	69		Sempre Foi Você	Lislaine F.	19/06/2026	https://link.amazon/B0j2gPSxS
4	70		Quebrando as Nossas Regras	Lari Alcantara	13/07/2026	https://link.amazon/B0hzAtM41
74	71		Eclipse Fatal (Rosas de Sangue Livro 2)	Juliana Anferoli	03/06/2026	https://link.amazon/B0hpccokI
60	72		Uma Mulher Pra Chamar de Minha	Thais Rodrigues	11/05/2026	https://link.amazon/B03ET9Gpv
85	73		Galentine's with Benefits	Darci Maye	23/01/2026	https://link.amazon/B05kqoohl
84	74		Diário de uma Acompanhante	Yasmina Soto	10/06/2026	https://link.amazon/B0bSI1NOG
79	75		Armações do Amor	Samara Viana	01/05/2026	https://link.amazon/B03JVuuq8
88	76		Playing for Keeps: A Novel	Alexandria Bellefleur	06/01/2026	https://link.amazon/B0eQDjUZl
10	77		Take Two	Erica Goodwin	20/01/2026	https://link.amazon/B02PhEmjL
92	78		Conhecendo a Família da Namorada	Sam C. Di Angelo	20/02/2026	https://link.amazon/B0freuwOn
107	79		O Preço da Escuridão	Danda Odeleci	10/02/2026	https://link.amazon/B05g9J3Zg
93	80		Poder e Proteção (Trilogia Legado Accardini Livro 1)	R. B. Nobre	20/02/2026	https://link.amazon/B0cj5r6B9
22	81		Take the Shot	Jamey Moody	02/03/2026	https://link.amazon/B0eqFWatQ
94	82		A Esposa e a Terapeuta	Sulaíne Souza	06/03/2026	https://link.amazon/B01azNN7O
23	83		Paralelos	H. Zalv	17/01/2026	https://link.amazon/B0gFVI8wW
24	84		Love Me Like You Shouldn't	Harper Bliss	18/02/2026	https://link.amazon/B0bc27ivE
26	85		Sócias por Acaso	Clara Ann Simons	25/02/2026	https://link.amazon/B07tYW9y5
98	86		The Girl Who Bit Me	Valerie Hunter	24/01/2026	https://link.amazon/B02PtjUcm
25	87		Anderson in Bloom	Jennifer Dugan	03/03/2026	https://link.amazon/B09e0p31U
27	88		Segundas Intenções	Helena Delfic e Lorena Xavier	04/03/2026	https://link.amazon/B095UYFO9
99	89		A Fragile Spell (Magical Mishaps Book 1)	T. M. Kirk	17/02/2026	https://link.amazon/B02PtjUcm
30	90		The Witch's Pet	Tiana Warner	11/02/2026	https://link.amazon/B0gpJvgk6
28	91		The Wife	Cynthia Dane	16/02/2026	https://link.amazon/B0bC0hCPH
29	92		Full Court Crush	Sasha Brennan	12/02/2026	https://link.amazon/B09YIbbeT
33	93		In the Dark	Melissa Tereze	02/02/2026	https://link.amazon/B0avBPcXS
34	94		Get Over It, April Evans	Ashley Herring Blake	03/02/2026	https://link.amazon/B0euy50Se
32	95		Not Your Enemy	Madison Mar	06/02/2026	https://link.amazon/B0fPVxT3t
101	96		Checking for Love	Reba Bale	06/02/2026	https://link.amazon/B0e8t8hAS
40	97		Inside the Paint	Sasha Brennan	14/03/2026	https://link.amazon/B0ivxxepj
37	98		Unavoidably You	Lindsey Pennington	10/03/2026	https://link.amazon/B09XsOaBz
103	99		The Perfect Match	Adiba Jaigirdar	19/03/2026	https://link.amazon/B01QmaQqP
42	100		Finding Forever	Lise Gold	27/03/2026	https://link.amazon/B0dLWQNx7
41	101		A Estação do Medo	Emily Cooper e Angélica Andrade	31/03/2026	https://link.amazon/B0260Xiwq
108	102		Codename Lotus	Yiliana Ferran	22/03/2026	https://link.amazon/B06XHQPe6
105	103		Febre	Belinda Blanchett	30/03/2026	https://link.amazon/B0euZmssU
106	104		O Último Escândalo	M. R. Fernandess	13/03/2026	https://link.amazon/B03lmY1NJ
110	105		Million Dollar Marriage	Margo Glynn	14/04/2026	https://link.amazon/B0dPZ5dzU
44	106		As Sombras que Me Vestem	Aifos Abade	30/04/2026	https://link.amazon/B02D1ehcW
109	107		A Arte do Recomeço	Valéria de Paulo	27/03/2026	https://link.amazon/B02RF29mr
43	108		The Dark Sweetness: At the Bottom of the Well	Chandra Fisher	31/03/2026	https://link.amazon/B03LrPddI
124	109		As Estrelas e Nós	Maria Gabi	25/05/2026	https://link.amazon/B0b04p4B4
115	110		Nosso Clichê	Re Lemos 	22/04/2026	https://link.amazon/B0cJC4aa5
114	111		Cláusula da Paixão	Madu Oliveira	20/04/2026	https://link.amazon/B09Si784f
122	112		Um Desejo ao Destino	Julli Araújo	10/05/2026	https://link.amazon/B0ffyls7E
54	113		Perto do Mar Será Feliz	Pamela Canciani	02/05/2026	https://link.amazon/B07J6uhnn
45	114		From Hell, With Love	Bryce Oakley	03/04/2026	https://link.amazon/B04vJNjms
48	115		What I Want	Frances M. Thompson	21/04/2026	https://link.amazon/B02FqqEY6
51	116		Até Que o Amor Nos Encontre	Gabrielly Silva	07/04/2026	https://link.amazon/B0gYpiVBC
46	117		Reality Check	Lizzie Huxley-Jones	09/04/2026	https://link.amazon/B03B4Xl1r
117	118		Aposta Emocional	L. de Lírio	19/04/2026	https://link.amazon/B00bbdkOm
113	119		Make Your Move	Melissa Brayden	24/04/2026	https://link.amazon/B0haWfh76`;

const imagesDir = path.join(__dirname, 'public', 'images');
const images = fs.readdirSync(imagesDir);

const getImageForId = (id) => {
  const img = images.find(img => {
    const ext = path.extname(img);
    const basename = path.basename(img, ext);
    return basename === id;
  });
  return img ? `/images/${img}` : null;
};

const lines = tsvData.split('\n');
const books = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const cols = line.split('\t');
  let id, ordem, titulo, autora, lancamento, link;

  if (cols.length >= 7) {
    let rawId = cols[0].trim();
    id = parseInt(rawId, 10).toString();
    ordem = parseInt(cols[1].trim(), 10);
    titulo = cols[3].trim();
    autora = cols[4].trim();
    lancamento = cols[5].trim();
    link = cols[6].trim();
  } else {
    continue;
  }

  let month = "";
  if (lancamento && lancamento !== "-") {
    const parts = lancamento.split('/');
    if (parts.length === 3) {
      const monthIndex = parseInt(parts[1], 10) - 1;
      const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      month = months[monthIndex] || "";
    }
  }

  books.push({
    id,
    ordem,
    titulo,
    autora,
    lancamento: lancamento === '-' ? '' : lancamento,
    mes: month,
    link: link === '-' ? '' : link,
    capa: getImageForId(id)
  });
}

books.sort((a, b) => a.ordem - b.ordem);

const outputDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'books.json'), JSON.stringify(books, null, 2), 'utf-8');
console.log('Books data generated successfully.');
