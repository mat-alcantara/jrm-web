import React from 'react';
import { PDFViewer, Page, Text, View, Document } from '@react-pdf/renderer';

const OrderPDF: React.FC = () => {
  return (
    <PDFViewer>
      <Document>
        <Page size="A4">
          <View style={{ margin: '32 16' }}>
            <Text style={{ fontSize: '24', textAlign: 'center' }}>
              Dados de Corte
            </Text>
            <View>
              <Text style={{ fontSize: '16', margin: '32 0 16 0' }}>
                Dados do cliente:
              </Text>
              <Text style={{ fontSize: '12', marginBottom: '8' }}>
                Nome: Mateus Alcantara de Castro
              </Text>
              <Text style={{ fontSize: '12', marginBottom: '8' }}>
                Endereço: Travessa dos Coqueiros n° 40, Frade, Angra dos Reis -
                RJ
              </Text>
              <Text style={{ fontSize: '12' }}>Telefone: 24999710064</Text>
            </View>
            <View>
              <Text style={{ fontSize: '16', margin: '32 0 16 0' }}>
                Dados do Pedido:
              </Text>
              <Text style={{ fontSize: '12', marginBottom: '8' }}>
                Vendedor: Mateus
              </Text>
              <Text style={{ fontSize: '12', marginBottom: '8' }}>
                Loja: Frade
              </Text>
              <Text style={{ fontSize: '12', marginBottom: '8' }}>
                Status do pagamento: Pago
              </Text>
              <Text style={{ fontSize: '12' }}>
                Observação: Entregar na casa do cliente
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: '16', margin: '32 0 16 0' }}>
                Lista de peças:
              </Text>
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '12',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Text>Material</Text>
                  <Text>Quantidade</Text>
                  <Text>Lado A</Text>
                  <Text>Lado B</Text>
                  <Text>Borda A</Text>
                  <Text>Borda B</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: '12',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Text>MDF 15mm Comum</Text>
                  <Text>2 peças</Text>
                  <Text>500</Text>
                  <Text>800</Text>
                  <Text>1</Text>
                  <Text>2</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default OrderPDF;
