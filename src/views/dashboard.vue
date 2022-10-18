<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple" />
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>最近发表</span>
              <el-button class="button" text>热门文章</el-button>
            </div>
          </template>
          <div v-for="o in 2" :key="o" class="text item">今日精选</div>
        </el-card>
      </el-col>
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple" />
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>系统信息</span>
              <!-- <el-button class="button" text>Operation button</el-button> -->
            </div>
          </template>
          <div class="text item">会员数{{ info.user_count }}</div>
          <div class="text item">帖子总数{{ info.article_count }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div id="chartDom" style="width: 500px; height: 410px"></div>
</template>

<script setup>
import { getPlatformInfo } from '@/api';
import { reactive, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
let weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
let today = new Date().getDay();
today = today + 1 > 6 ? 0 : today + 1;
weekArr = [...weekArr.splice(today), ...weekArr];
function loadEcharts() {
  var chartDom = document.getElementById('chartDom');
  var myChart = echarts.init(chartDom);
  var option;
  // option = {
  //   xAxis: {
  //     type: 'category',
  //     data: weekArr,
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: info.week_article,
  //       type: 'line',
  //     },
  //   ],
  // };
  option = {
    xAxis: {
      type: 'category',
      data: weekArr,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: info.week_article,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  };
  option && myChart.setOption(option);
}
let info = reactive({
  article_count: 0,
  user_count: 0,
  week_article: [],
});
onMounted(function () {
  getPlatformInfo().then((res) => {
    console.log(res);
    let { article_count, user_count, week_article } = res.data;
    info.article_count = article_count;
    info.user_count = user_count;
    info.week_article = week_article;
    //因为数据要在请求后才有所以封装函数
    loadEcharts();
  });
});
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
