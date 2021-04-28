import React from 'react';
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Line,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  table: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    textAlign: 'center',
  },
  columnTitle: {
    fontSize: '12',
    textAlign: 'center',
  },
  row: {
    fontSize: '10',
    textAlign: 'center',
    marginTop: '4',
  },
  footer: {
    fontSize: '8',
    textAlign: 'center',
    marginBottom: '4',
  },
});

const OrderPDF: React.FC = () => {
  return (
    <PDFViewer style={{ margin: '0 auto', height: '100vh', with: '100vm' }}>
      <Document>
        <Page size="A4">
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '95%',
              justifyContent: 'space-between',
              margin: '32 16',
            }}
          >
            <View>
              <Text style={{ fontSize: '24', textAlign: 'center' }}>
                Relatório de Corte
              </Text>

              <Svg height="1" width="100%" style={{ marginTop: '8' }}>
                <Line
                  x1="0"
                  y1="0"
                  x2="1000"
                  y2="0"
                  strokeWidth={2}
                  stroke="#c1c1c1"
                />
              </Svg>

              <View>
                <Text style={{ fontSize: '16', margin: '16 0 12 0' }}>
                  Dados do cliente
                </Text>
                <Text style={{ fontSize: '12', marginBottom: '4' }}>
                  Nome: Mateus Alcantara de Castro
                </Text>
                <Text style={{ fontSize: '12', marginBottom: '4' }}>
                  Endereço: Travessa dos Coqueiros n° 40, Frade, Angra dos Reis
                  - RJ
                </Text>
                <Text style={{ fontSize: '12' }}>Telefone: 24999710064</Text>
              </View>
              <Svg height="1" width="100%" style={{ marginTop: '16' }}>
                <Line
                  x1="0"
                  y1="0"
                  x2="1000"
                  y2="0"
                  strokeWidth={2}
                  stroke="#c1c1c1"
                />
              </Svg>
              <View>
                <Text style={{ fontSize: '16', margin: '16 0 12 0' }}>
                  Dados do Pedido
                </Text>
                <Text style={{ fontSize: '12', marginBottom: '4' }}>
                  Vendedor: Mateus
                </Text>
                <Text style={{ fontSize: '12', marginBottom: '4' }}>
                  Loja: Frade
                </Text>
                <Text style={{ fontSize: '12', marginBottom: '4' }}>
                  Status do pagamento: Pago
                </Text>
                <Text style={{ fontSize: '12' }}>
                  Observação: Entregar na casa do cliente
                </Text>
              </View>
              <Svg height="1" width="100%" style={{ marginTop: '16' }}>
                <Line
                  x1="0"
                  y1="0"
                  x2="1000"
                  y2="0"
                  strokeWidth={2}
                  stroke="#c1c1c1"
                />
              </Svg>
              <View>
                <Text style={{ fontSize: '16', margin: '16 0 16 0' }}>
                  Lista de peças
                </Text>
                <View style={styles.table}>
                  <View style={[styles.column, { width: '1800' }]}>
                    <Text style={styles.columnTitle}>Material</Text>
                    <Text style={styles.row}>MDF 15mm Comum</Text>
                    <Text style={styles.row}>MDF 15mm Comum</Text>
                    <Text style={styles.row}>MDF 15mm Carvalho Leggero</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.columnTitle}>Quantidade</Text>
                    <Text style={styles.row}>5</Text>
                    <Text style={styles.row}>7</Text>
                    <Text style={styles.row}>4</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.columnTitle}>Lado A</Text>
                    <Text style={styles.row}>200</Text>
                    <Text style={styles.row}>400</Text>
                    <Text style={styles.row}>320</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.columnTitle}>Lado B</Text>
                    <Text style={styles.row}>550</Text>
                    <Text style={styles.row}>450</Text>
                    <Text style={styles.row}>320</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.columnTitle}>Fita A</Text>
                    <Text style={styles.row}>2</Text>
                    <Text style={styles.row}>0</Text>
                    <Text style={styles.row}>1</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.columnTitle}>Fita B</Text>
                    <Text style={styles.row}>2</Text>
                    <Text style={styles.row}>1</Text>
                    <Text style={styles.row}>0</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={styles.footer}>
                JRM Compensados | www.jrmcompensados.com
              </Text>
              <Text style={styles.footer}>
                Rua Julieta Conceição Reis 280, Frade | Rua Julieta Conceição
                Reis 280, Frade | Rua Julieta Conceição Reis 280, Frade
              </Text>
              <Text style={styles.footer}>
                (24) 99999-9999 | (24) 99999-9999 | (24) 99999-9999
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default OrderPDF;
