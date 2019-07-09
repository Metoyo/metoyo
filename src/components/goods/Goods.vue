<template>
  <div class="container goods">
    <div class="content">
      <div class="goods-list">
        <Card style="padding-bottom:10px;">
          <a href="http://www.baidu.com" target="_blank">
            <p><img src="https://img.alicdn.com/tfscom/i3/2128787094/TB2dk65qVXXXXamXpXXXXXXXXXX_!!2128787094.jpg_460x460xz.jpg"></p>
            <p class="plr10 mt10">武汉热干面165gX6</p>
            <p class="plr10 mt10">
              <span class="clRed">原价:￥50</span>
              <span class="clGreen ml10">券后:￥30</span>
            </p>
            <p class="plr10 mt10">
              <span class="clGray">
                <Icon type="ios-heart" class="fll" style="font-size:20px"/>
                <span class="ml5">9999</span>
              </span>
              <Button type="default" size="small" class="flr">领9999元券</Button>
            </p>
          </a>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods-list{
  width: 1015px;
  margin: 0 auto;
}
.goods-list .ivu-card{
  width: 190px;
  display: inline-block;
  margin-bottom: 20px;
  margin-right: 10px;
}
</style>
<style>
.goods-list .ivu-card-body{
  padding: 0;
}
</style>

