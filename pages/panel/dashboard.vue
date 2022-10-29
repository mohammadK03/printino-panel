<template>
  <v-app style="background: #eaecef !important">
    <v-container style="">
      <v-row>
        <v-col cols="12" md="12">
          <v-container style="">
            <v-row>
              <v-card
                elevation="0"
                style="
                  background-color: #fff;
                  padding: 10px;
                  border-radius: 10px;
                  box-shadow: 1px 1px 19px 13px #f1f1f1;
                "
                width="100%"
              >
                <v-flex class="d-flex flex-column flex-sm-row">
                  <v-col cols="12" sm="3">
                    <v-flex class="d-flex flex-column">
                      <span>داشبورد</span>
                      <span class="subtitle">درآمد فروشگاه شما</span>
                      <span
                        v-if="moreData && moreData.sum"
                        style="
                          margin-top: 30px;
                          font-weight: bold;
                          font-size: 20px;
                        "
                        >{{
                          toPersianNumber(formatPrice(moreData.sum))
                        }}
                        ریال</span
                      >
                    
                      <span v-if="tab == 0" class="subtitle"
                        >درآمد روز جاری از فروش</span
                      >
                      <span v-if="tab == 1" class="subtitle"
                        >درآمد ماه جاری از فروش</span
                      >
                      <span v-if="tab == 2" class="subtitle"
                        >درآمد سال جاری از فروش</span
                      >
                      <span
                        v-if="moreData && moreData.count"
                        style="
                          margin-top: 30px;
                          font-weight: bold;
                          font-size: 20px;
                        "
                        >{{ toPersianNumber(moreData.count) }} عدد</span
                      >
                     
                      <span v-if="tab == 0" class="subtitle"
                        >تعداد کل فروش های انجام شده روز جاری</span
                      >
                      <span v-if="tab == 1" class="subtitle"
                        >تعداد کل فروش های انجام شده ماه جاری</span
                      >
                      <span v-if="tab == 2" class="subtitle"
                        >تعداد کل فروش های انجام شده سال جاری</span
                      >
                    </v-flex>
                  </v-col>

                  <v-col cols="12" sm="9">
                    <v-flex class="d-flex flex-column">
                      <div>
                        <v-flex class="d-flex flex-column flex-sm-row">
                          <div>
                            <v-tabs color="#ec4789" v-model="tab">
                              <v-tab style="letter-spacing: normal"
                                >فروش امروز</v-tab
                              >
                              <v-tab style="letter-spacing: normal"
                                >فروش ماه جاری</v-tab
                              >
                              <v-tab style="letter-spacing: normal"
                                >فروش سال جاری</v-tab
                              >
                            </v-tabs>
                          </div>
                        </v-flex>
                      </div>
                      <div style="margin: 10px">
                        <line-chart
                          width="500"
                          height="200"
                          :chart-data="dataCollection"
                          :options="options"
                        ></line-chart>
                      </div>
                    </v-flex>
                  </v-col>
                </v-flex>
              </v-card>
            </v-row>
          </v-container>
        </v-col>
        <!-- <v-col cols="12" md="4">
          <v-container fulid style="height: 100%">
            <v-card
              elevation="1"
              width="100%"
              height="100%"
              style="padding-top: 20px"
            >
              <v-flex class="d-flex justify-center"> </v-flex>
              <v-flex class="d-flex flex-column" style="margin: 20px">
                <span
                  style="margin-top: 30px; font-weight: bold; font-size: 20px"
                  >{{
                    toPersianNumber(formatPrice(allLoan.allAmount))
                  }}
                  ریال</span
                >
                <span class="subtitle">مبلغ کل فروش</span>

                <span
                  style="margin-top: 30px; font-weight: bold; font-size: 20px"
                  >{{
                    toPersianNumber(formatPrice(allLoan.allProfit))
                  }}
                  ریال</span
                >
                <span class="subtitle">مبلغ کل فروش های انجام شده</span>
              </v-flex>
            </v-card>
          </v-container>
        </v-col> -->
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import LineChart from "~/static/LineChart.js";

import { toPersianNumber, formatPrice } from "~/static/formatNumber.js";
import { url } from "~/static/URL.js";
export default {
  layout: "panel",
  components: {
    LineChart,
  },
  data() {
    return {
      tab: 0,
      dataCollection: {},

      type: 1,

      moreData: { sum: 0, count: 0 },
      circleOptions: {
        cutoutPercentage: 70,
        segmentShowStroke: false,

        elements: {
          arc: {
            borderWidth: 0,
          },
        },
        responsive: true,
        legend: {
          display: false,
        },

        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
      options: {
        responsive: true,
        maintainAspectRatios: false,
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (value, index, values) => {
                  return (
                    this.toPersianNumber(this.formatPrice(value)) + " ریال"
                  );
                },
              },
            },
          ],
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItems, data) => {
              return (
                this.toPersianNumber(this.formatPrice(tooltipItems.yLabel)) +
                " ریال"
              );
            },
          },
        },
      },
      persianMonths: [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر	",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ],

      lineChartModeSelected: 1,
    };
  },
  watch: {
    tab(val) {
      this.getCashDesk(val + 1);
    },
  },

  methods: {
    toPersianNumber: toPersianNumber,
    formatPrice: formatPrice,

    async getCashDesk(type) {
      this.getCashDeskMore(type);
      if (process.browser) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        try {
          let resp = await this.$axios.$get(
            url + "api/shop/cashdesk?type=" + type,
            { headers }
          );

          this.createChart(resp.body, this.tab);
        } catch (error) {
         
        }
      }
    },
    async getCashDeskMore(type) {
      if (process.browser) {
        let headers = {
          authorization: localStorage.getItem("adminToken"),
        };
        try {
          let resp = await this.$axios.$get(
            url + "api/shop/cashdesk/more?type=" + type,
            { headers }
          );
       
          this.moreData = resp.body;
        } catch (error) {
         
        }
      }
    },
    createChart(data, type) {
      let labels = [];
      let mdata = [];
      for (var a = 0; a < data.length; a++) {
        let cDate = data[a].jStartDate;

        if (cDate) {
          switch (this.tab) {
            case 0: {
              labels.push("ساعت : " + this.toPersianNumber(data[a]._id.hour));
              mdata.push(data[a].sum);
              break;
            }
            case 1: {
              cDate = data[a]._id.day;
              labels.push(cDate);
              mdata.push(data[a].sum);
              break;
            }

            case 2: {
              let date = new Date(cDate);

              labels.push(this.persianMonths[data[a]._id.month - 1]);
              mdata.push(data[a].sum);
              break;
            }
          }
        }
      }

      this.dataCollection = {
        labels,
        datasets: [
          {
            data: mdata,
            label: "میزان فروش ",
            backgroundColor: "rgba(164, 79, 255, 0.2)",
            borderColor: "#8c6bbc",
          },
        ],
      };
     
    },
  },
  created() {
    if (process.browser) {
      if (localStorage.getItem("adminToken")) {
        // this.getCashDesk(1);
      } else {
        this.$router.replace("/auth/login");
      }
    }

    //this.getPieChartData();
    //  this.getIncomeCashDesk(1);
  },
};
</script>

<style scoped>
.subtitle {
  font-size: 12px;
}
</style>