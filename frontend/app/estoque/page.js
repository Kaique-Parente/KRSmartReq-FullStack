'use client'



import BotaoPersonalizado from "@/components/generics/BotaoPersonalizado";
import ComboBox from "@/components/MUI/ComboBox";
import Tabela from "@/components/MUI/Tabela";
import { TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const tableHeaderSetores = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'ID da Requisição',
      },
      {
          id: 'setor',
          numeric: true,
          disablePadding: false,
          label: 'Setor',
      },
      {
        id: 'requisicoes',
        numeric: true,
        disablePadding: false,
        label: 'Requisições',
      },
      {
        id: 'situacao',
        numeric: false,
        disablePadding: false,
        label: 'Situação',
      },
];

const tableHeaderItens = [
      {
          id: 'sku',
          numeric: false,
          disablePadding: false,
          label: 'SKU',
      },
      {
        id: 'nome',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
      },
      {
        id: 'medida',
        numeric: false,
        disablePadding: false,
        label: 'Unidade de Medida',
      },
      {
        id: 'quantidade',
        numeric: true,
        disablePadding: false,
        label: 'Quantidade',
      },
];

const tableHeaderItensEnviar = [
    {
        id: 'produto',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
    },
    {
      id: 'medida',
      numeric: false,
      disablePadding: false,
      label: 'Unidade de Medida',
    },
    {
      id: 'quantidade',
      numeric: true,
      disablePadding: false,
      label: 'Quantidade',
    },
    {
      id: 'observacao',
      numeric: false,
      disablePadding: false,
      label: 'Observação',
    },
];

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 60px;
`

const ContainerSetores = styled.div`

`

const ContainerItens = styled.div`
    
`

const ContainerItensEnviados = styled.div`
    display: flex;
    justify-content: space-between;
`

export default function Estoque(){
   
    const rowsSetores = [
        {
            id: 1,
            item: 1,
            setor: 'cozinha',
            requisicoes: 3,
            situacao: 'Pendente'
        },
        {
            id: 2,
            item: 2,
            setor: 'café',
            requisicoes: 5,
            situacao: 'Pendente'
        },
        {
            id: 3,
            item: 3,
            setor: 'bar',
            requisicoes: 4,
            situacao: 'Normal'
        },
    ];

    const rowsItens = [
        {
            id: 1,
            item: '3333333KS',
            nome: 'Barra de chocolate ao leite',
            medida: 'kg',
            quantidade: 20
        },
        {
            id: 2,
            item: '333VVVV33KS',
            nome: 'Sorvete cream and Mulcream Dengo',
            medida: 'kg',
            quantidade: 10
        },
        {
            id: 3,
            item: '333VVV3333KS',
            nome: 'Copos de 300ml',
            medida: 'caixas',
            quantidade: 20
        },
    ];

    const [rowsItensEnviar, setRowsItensEnviar] = useState([
        {
            id: 1,
            item: '3333333KS',
            nome: 'Barra de chocolate ao leite',
            medida: 'kg',
            quantidade: 20,
            observacao: 'aaaaaawd8ipçhon iujçn hfceuljoçkw newçolijufhn wioeuçjfhn olweufhnoliçeuwhnfçoquhnçoqhwdçoiuqwhçoiwqhdqioçwh'
        },
        {
            id: 2,
            item: '333VVVV33KS',
            nome: 'Sorvete cream and Mulcream Dengo',
            medida: 'kg',
            quantidade: 10,
            observacao: 'aaaaaawd8ipçhon iujçn hfceuljoçkw newçolijufhn wioeuçjfhn olweufhnoliçeuwhnfçoquhnçoqhwdçoiuqwhçoiwqhdqioçwh'
        },
        {
            id: 3,
            item: '333VVV3333KS',
            nome: 'Copos de 300ml',
            medida: 'caixas',
            quantidade: 20,
            observacao: 'aaaaaawd8ipçhon iujçn hfceuljoçkw newçolijufhn wioeuçjfhn olweufhnoliçeuwhnfçoquhnçoqhwdçoiuqwhçoiwqhdqioçwh'
        },
    ]);

    console.log(rowsItens);
    const [selectedRows, setSelectedRows] = useState([]);
    const [quantidade, setQuantidade] = useState(0);

    const handleQuantidadeChange = (e) => {
        setQuantidade(e.target.value);
    };

    const handleDeleteRow = () =>{
        console.log('aa');
    }

    const handleSelected = (selected) =>{
        setSelectedRows(selected);
        console.log(selectedRows);
    }

    const handleSendItem = () => {
        
        console.log(rowsItensEnviar);
    }

    const [activateBodyHamburguer, setActivateBodyHamburguer] = useState(false);

    return(
        <Container>
            <ContainerSetores>
                <TextField label="Pesquisar"></TextField>
                <Tabela
                    title="Requisições de Cada Setor" 
                    tableHeader={tableHeaderSetores} 
                    rows={rowsSetores} 
                    onDeleteRow={handleDeleteRow}
                    fontHeader={12}
                    visibilityDense={false}
                    activateBodyHamburguer = {activateBodyHamburguer}
                />
            </ContainerSetores>

            <ContainerItens>
                <h3>Requisição do Setor: .....</h3>
                <ComboBox    
                    label="Nº Requisição"
                />
                <Tabela
                    tableHeader={tableHeaderItens} 
                    rows={rowsItens} 
                    onDeleteRow={handleDeleteRow}
                    fontHeader={12}
                    visibilityDense={false}
                    activateBodyHamburguer = {activateBodyHamburguer}
                    disableHead={true}
                    updateSelect={handleSelected}
                />
                <Tabela
                    title="Itens para enviar" 
                    tableHeader={tableHeaderItensEnviar} 
                    rows={rowsItensEnviar} 
                    onDeleteRow={handleDeleteRow}
                    fontHeader={12}
                    visibilityDense={false}
                    activateBodyHamburguer = {activateBodyHamburguer}
                />
            </ContainerItens>

            <ContainerItensEnviados>
                <div>
                    <TextField 
                        label="Quantidade"
                        value={quantidade}
                        onChange={handleQuantidadeChange}
                    />
                    <BotaoPersonalizado type="button" text="Enviar" color="amarelo" onClick={handleSendItem}/>
                </div>
            </ContainerItensEnviados>
            <BotaoPersonalizado width="100%" text="Confirmar" color="marrom"/>
        </Container>
    );
}