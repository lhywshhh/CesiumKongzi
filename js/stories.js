//卷轴展开效果
window.unfold = function unfold() {
    $(".l-pic-index").animate({ 'left': '0px' }, 1500);
    $(".r-pic-index").animate({ 'right': '0px' }, 1500);
    $(".l-bg-index").animate({ 'width': '300px', 'left': '200px' }, 1500);
    $(".r-bg-index").animate({ 'width': '300px', 'left': '500px' }, 1500, function () {
    $(".main-index").fadeIn(400);
});
};

//卷上卷轴
window.fold = function fold() {
		$(".l-pic-index").css("left","300px");
		$(".r-pic-index").css("right","300px");
		$(".l-bg-index").css({'width': '20px', 'left': '500px'} );
		$(".r-bg-index").css({'width': '20px', 'left': '504px' });
		$(".main-index").css("display","none");
};

//卷轴
//起点
window.opening = function opening() {
    // 当 html 方法传参时，即为修改该元素的内容
    $('.main-index').html(`
        <p class="intro-text">
        孔子（公元前551年9月28日—前479年4月11日），名丘，字仲尼，春秋时期鲁国陬邑（今山东省曲阜市）人，祖籍宋国栗邑（今河南省夏邑县）。父叔梁纥，母颜氏。中国古代思想家、政治家、教育家，儒家学派创始人。
        </p><p class="intro-text">孔子三岁丧父，家道中落，早年做过管粮仓、管放牧的小官。他“少好礼”，自幼熟悉传统礼制，青年时便以广博的礼乐知识闻名于鲁，从事儒者之业，以办理丧祭之礼为生。中年聚徒讲学，从事教育活动。年五十，曾一度担任鲁国的司寇，摄行相职，积极推行自己的政治主张，不久因与当政者政见不合而弃官去鲁，偕弟子周游列国，宣传自己的政治主张和思想学说，终未见用。晚年回到鲁国，致力教育事业，整理《诗》《书》，删修《春秋》，以传述六艺为终身志业。
        </p><p class="intro-text">孔子曾带领部分弟子周游列国十四年，修订六经。去世后，其弟子及再传弟子把孔子及其弟子的言行语录和思想记录下来，整理编成《论语》。该书被奉为儒家经典。 [1]孔子对后世影响深远长久。他的“仁”与“礼”成为国家施政和个人自我修养的重要准则；“有教无类”的平民教育思想使华夏文明得以无限传承；对古代文献的系统整理，不仅寄予了自己的理想，更使得中华民族的文化遗产具有了深广的内涵。</p>
    `);
};

//前往齐国的路上
window.Pukou = function Pukou() {
    // 当 html 方法传参时，即为修改该元素的内容
    $('.main-index').html(`
        <p class="intro-text">
        孔子在前往齐国的路上，突然听到有人在哭，声音显得很悲哀。孔子对驾车的人说：“这哭声，虽然听起来很悲哀，却不是家中有人去世的悲痛之声啊！”于是，赶着马车寻声到前面，前进一小段路后，便看到一个不寻常的人，身上挂着镰刀，系着白带，在那里失声痛哭，然而却不是哀丧之哭。
        </p><p class="intro-text">孔子于是下车，上前问道：“先生，请问您是什么人呢？”那人回答：“我叫丘吾子。”孔子问：“您现在并不是服丧的时候，为何会哭得这样悲伤呢？”丘吾子哽咽地说：“我此生有三个过失，可惜到了晚年才觉悟到，但已经是追悔莫及了。”孔子便问：“您的三个过失，可以让我听闻吗？希望您能告诉我，不要有什么隐讳啊。”丘吾子悲痛地说：“我年轻时喜欢学习，可等我到处寻师访友，周游各国回来后，我的父母却已经死了，这是我第一大过失；在壮年时，我侍奉齐国君王，然君王却骄傲奢侈，丧失民心，我未能尽到为人臣的职责，这是我第二大过失；我生平很重视友谊，可如今朋友间却离散断绝了，这是我第三大过失。”丘吾子又仰天悲叹道：“ 树木想要静下来，可是风却刮个不停；儿子想要奉养父母，父母却不在了。过去了永远不会再回来的，是年龄啊；再也不能见到的，是父母啊！就让我从此辞谢这个人世吧！”因此，丘吾子便投水自尽了。
        </p><p class="intro-text">孔子很感叹地对弟子们说：“你们应记着此事，这足以作为我们的借鉴啊！”</p> 
    `);
};

//齐国
window.Qiguo = function Qiguo() {
    // 当 html 方法传参时，即为修改该元素的内容
    $('.main-index').html(`
        <p class="intro-text">
        公元前517年，孔子因鲁国三桓贵族擅权导致政变，鲁昭公被驱逐到齐国，孔子对鲁国局势不满而离开，前往齐国谋求发展。在齐国，孔子成为齐景公亲信高昭子的家臣，向齐景公提出“正名”和节约的政治主张，初步得到认可。然而，齐国执政大臣晏婴不赞成孔子的礼数主张，齐景公也逐渐对孔子冷淡。最终，齐景公表示无法任用孔子进行改革，孔子便离开了齐国。
        </p> 
    `);
};

//从齐国逃回鲁国
window.Luguo = function Luguo() {
    $('.main-index').html(`
        <p class="intro-text"> 
        孔子从齐国逃回鲁国后不久，当年逃难在外的鲁昭公客死在了乾侯。鲁昭公最初逃到了齐国，但齐景公在对待鲁昭公时以“主君”自称，鲁昭公以为耻辱，便又转投了晋国，晋国则把他安置在了乾侯，直到鲁昭公去世。鲁昭公死后，三桓立其弟鲁定公为君。五年后，鲁昭公的死对头季平子也去世了，其子季桓子继位。而当时鲁国的政权实际上已经落入季氏的手中了。
        </p><p class="intro-text">
            季桓子有个宠臣叫做仲梁怀，仗着背后有人就到处狐假虎威、作威作福，结果得罪了不少人，但大部分人害怕季氏所以都敢怒不敢言，但他惹了一个不该惹的人，这个人就是阳虎。阳虎也是季氏的家臣，季氏挟鲁君以令鲁国，阳虎则是挟季氏以令鲁国，可以说是得到了主子的真传，他一不做二不休就把仲梁怀抓了起来。这下季桓子怒了，结果也被阳虎囚禁了起来，从此家臣出身的阳虎成了鲁国的实际掌控者。一心志在恢复周礼的孔子看到如此礼崩乐坏的情景，更加心灰意冷，于是便不再谋求出仕，全身心地投入到修订《诗》《书》《礼》《乐》的工作中。也是在这期间，越来越多的人从四面八方慕名而来，纷纷投入孔子门下，成为孔子的弟子。
        </p><p class="intro-text">
            鲁定公九年（公元前501年），季桓子在孟孙氏和叔孙氏两家的帮助下打败阳虎，重夺政权，阳虎则逃奔到了齐国，不久又转投晋国赵氏，时年孔子五十岁。同年，季桓子的另一个家臣公山不狃在费邑反叛，派人征召孔子。那个时候孔子已经很久没当官了，于是就想前往，以此完成复兴礼乐的大业，并说：“周文王、周武王起于丰、镐而称王天下，如今费邑虽小，但也未必毫无希望！”但他的弟子子路却不高兴，阻止孔子道：“当初阳虎征召你，你不出仕，现在公山不狃同为家臣执政，你却要前往，这算什么呢？”孔子道：“他们征召我，岂能徒劳无益呢？如果任用我，我将在东方复兴周礼！”不过孔子最终没有成行，因为不久之后季桓子便借鲁定公之名任命孔子做了中都宰，一年后又升为司空。
        </p><p class="intro-text">
            鲁定公十年（公元前500年），齐国大夫黎鉏对齐景公道：“鲁国起用孔子，这形势恐怕会不利于我们齐国。”我说齐国这帮大夫也真无聊，当初人家在齐国的时候，不让自己的国君用他，还想方设法要加害人家，现在人家回到了自己母国，被自己的国家重用，又说会对齐国不利，这双标也没谁了。虽然齐国这帮大夫说的话不一定靠谱，但齐景公是知道孔子斤两的，也害怕鲁国起来后不利于齐国，于是邀请鲁国在夹谷会盟，并打算趁机对付鲁国。当时鲁国和齐国关系比较好，所以鲁定公本打算来个无车之盟（不带兵的会盟），孔子听说后，便劝谏道：“臣听说有文事的话就必须有武备，有武事的话就必须有文备。古代诸侯走出自己的国界，必定会备齐文武官员跟随前往。请带上左、右司马。”鲁定公答应了，结果到了约定的会盟地点夹谷，果然齐国也带了兵马而来，若不是孔子有先见之明，鲁定公恐步宋襄公后尘。会盟期间，齐景公让人演奏四方之乐助兴，结果演奏的竟是夷狄的音乐，孔子不禁出席道：“我们两国的国君在这里举行友好会盟，夷狄的音乐为何出现在这里！请齐君下令撤走！”齐景公自知理亏，于是下令撤走，让人改奏宫中之乐，结果一群侏儒乐师嘻嘻哈哈地跑了上来，孔子见状，再次离席怒道：“身为下人，却胆敢戏弄诸侯，其罪当诛！请齐君下令执行。”齐景公震恐，只得下令杀了这群乐师。齐景公本来打算在会盟期间对付鲁国的，现在事情还没做，气势上就先输了三分，于是原本想做的事情也不敢做了，还把之前侵占的鲁国的郓、讙、龟阴之田归还给了鲁国，以此来表达歉意。孔子不费一兵一卒帮鲁国夺回了失地，凭借的正是其信奉的礼乐的力量，然而这个力量对齐景公这样尚有羞耻之心的人或许有效，但如果碰到无赖之人恐怕又是另一种结果了。所以孔子的信仰未必有错，但是否符合那个时代的需要，就值得商榷了。
        </p><p class="intro-text">
            鲁定公十二年（公元前498年），孔子为了巩固君权，削弱三桓，向鲁定公进言：“臣子不能有私藏的武器，大夫不能有三百丈城墙的封地。”在得到鲁定公的支持后，孔子让自己的弟子仲由（字子路）担任季氏的家宰，准备实施“堕三都”之计。所谓“堕三都”，其实就是堕毁孟孙氏、叔孙氏、季孙氏三家封邑的城墙，让他们丧失自守的能力。那既然是堕三桓之都，季氏也是三桓之一，为什么要让弟子仲由担任季氏的家宰来执行此事呢？其实也很简单，因为当时季氏的封地费邑不在季桓子手中，还在公山不狃的手中，所以孔子要“堕三都”，不仅鲁定公支持，实际掌权的季桓子也默许，而担任季氏的家宰来拆自家的城墙，在名义上也更加名正言顺。计策一开始进行的很顺利，仲由首先堕毁了叔孙氏的郈邑，但在准备堕毁季孙氏的费邑的时候，遭到了公山不狃和叔孙氏的联合抵抗，但最终被孔子率兵打败，公山不狃和叔孙氏逃奔齐国，于是费邑也被成功堕毁。最后只剩下孟孙氏的成邑了，但在孟孙氏的家臣公敛阳的殊死抵抗下，最终未能堕毁。孔子的“堕三都”之计最终宣告流产。
        </p><p class="intro-text">
            鲁定公十四年（公元前496年），孔子升为鲁国大司寇，摄相事，时年孔子五十六岁，熬了大半辈子，终于有了一展抱负的机会，孔子不禁面露喜色。有弟子见到后，就对他说：“听说君子面对灾难不恐惧，面对福运不喜悦。”孔子说：“是有这样的话。但不是还有‘身居高位礼贤下士而自得其乐’这样的话吗？”孔子治理鲁国三个月后，做生意的不随便抬价；男女行路分道而走；路不拾遗；从四面八方来到鲁国的客人无须官吏批准，全部予以接纳，就像回到了自己家中。
        </p><p class="intro-text">
            邻居齐国听说鲁国的情况后，都认为这样下去鲁国迟早要称霸，十分恐惧，甚至有人提议献土地给鲁国以求全。大夫黎鉏对齐景公道：“请先尝试设法阻止孔子当政；阻止不成再献土地也不迟。”于是齐国挑选了八十名美女送往鲁国，其时鲁国由季氏掌政，季桓子接受了齐国进献的美女，并整日沉迷于美色之中，不思朝政。于是孔子与季桓子出现矛盾，打算离去，大夫师己听说后前来送行，对孔子道：“您又没有什么罪过，为什么要走？”于是孔子唱了首歌，歌曰：“彼妇之口，可以出走；彼妇之谒，可以死败；盖优哉游哉。维以卒岁！”师己回去后，季桓子问师己孔子离去的原因，师己如实相告，季桓子喟然长叹道：“夫子因为齐女之事而怪罪我啊！”
            孔子离开鲁国后，正式开启了他周游列国的旅程。
        </p>
    `);
};

//第一次卫国
window.Weiguo = function Weiguo() {
    $('.main-index').html(`
        <p class="intro-text">
        他们首先达到的第一站是卫国。当时卫国的国君是卫灵公，他久闻孔子大名，于是就接见了孔子，还问他：“您在鲁国的俸禄是多少？”孔子说：“我在鲁国的俸禄是六万石粮食。”于是卫灵公也给了孔子六万石粮食。但是这遭到了卫灵公身边一些小人的忌恨，他们向卫灵公进谗说孔子的坏话，孔子知道后很害怕，于是在卫国待了十个月后就离开了卫国。
        </p>
    `);
};

//卫国到陈国的路上
window.Suixian = function Suixian() {
    $('.main-index').html(`
        <p class="intro-text"> 
        离开卫国后，孔子原本计划的下一站是陈国，结果在途径匡邑的时候被当地人抓了起来。原因是鲁国的阳虎曾迫害过当地人，而不幸的是孔子又长得很像他的这位死对头阳虎，所以被匡人当做阳虎给抓了起来。当时孔子的弟子颜渊被落在的后面，他赶上来后，孔子不无担心地对他道：“我还以为你死了呢。”颜渊回道：“您还健在，我怎么敢先您而去呢！”孔子笑道：“周文王死后，周朝的文化都在我这里了。如果上天想要灭亡周朝的文化，又何必让我继承它？既然上天不想要灭亡周朝的文化，匡人又能把我怎么样呢！”孔子在匡邑被当地人关了五天，当时有孔子的弟子在卫国大夫宁武子那做家臣，得知此事后就报告了宁武子，宁武子便派人救出了孔子师徒，于是孔子暂且又返回了卫国。
        </p> 
    `);
};

//返回卫国
window.Weiguo2 = function Weiguo2() {
    $('.main-index').html(`
        <p class="intro-text">
        卫灵公有一个非常漂亮的夫人叫做南子，南子早有听说孔子的大名，所以就想见见孔子，于是卫灵公就托人转告了孔子，但儒家有言，非礼勿视，孔子身为老师更应该以身作则，于是他一开始婉言谢绝了，但架不住卫灵公一而再再而三的相请，最终孔子和南子二人隔着帷帐互相行了礼。子路知道了此事后就很不高兴，质问孔子：“您平时不是教育我们‘非礼勿视’吗？现在您怎么自己跑去见人家国君的夫人了？”孔子解释道：“我原本是不想见她的，就算见了也是以礼相待的，如果我有说谎，就让我天诛地灭！”子路见老师都发毒誓了，也就不好再说什么了，这事就这么过去了。就这样，孔子又在卫国待了一个多月，有一天卫灵公带着他的夫人同坐一辆马车出行，而让孔子坐第二辆马车陪同，孔子回去后感慨道：“吾未见好德如好色者也。”于是再次萌生了离开卫国的念头。
        </p>
    `);
};

//离开了宋国
window.Songguo = function Songguo() {
    $('.main-index').html(`
        <p class="intro-text">
        宋国是孔子老家，还是他的夫人亓官氏的家乡。孔子年轻时曾到此学殷礼，几十年后重来，孔子倍感亲切。他是想多留一段时间的，但宋国对这位年近六十、声名显赫的“同胞”，并未表现出什么热情。在这里，孔子非但没有受到礼遇，反而遭到周游列国中的第二次危难，差点把命丢了。
        </p><p class="intro-text">
        到了宋都商丘后，孔子提议到处看看。冉求驾车，一行人出城门走到北郊，看到有不少工匠在凿石，有工匠哭哭啼啼。弟子跑过去打听，回来说：“这些工匠，都是大臣司马桓？（ｔｕｉ）抓来为自己建造坟墓石椁的人，他们有的已干了三年，石椁仍未造好，在这儿干活，吃不饱穿不暖，病弱者渐渐死去，病死和被石板压死的有二十余人，大家怨声不绝。”
        </p><p class="intro-text">
        司马桓？很受宋景公宠爱，骄傲奢侈，已丧失世传贤大夫风范，孔子见他如此行事，指责说：“桓？这样奢侈浪费，不知爱惜民力物力，这样的人真不如死后快点烂掉！”孔子的话，传到司马桓？的耳朵里，他非常恼怒，就想害孔子。
        </p><p class="intro-text">
        孔子师徒住处附近有一棵大檀树，他们师徒时常在树下演习礼仪，有一天，司马桓？派人来清场，驱散听众，拉倒大树，留下个大坑叫檀坑，还想加害孔子。孔子知道得罪了小人，决定离开宋国。
        </p><p class="intro-text">
        弟子们担心司马桓？下毒手，劝孔子早点动身，孔子平静地说：“天生德于予，桓？其如予何！”就是说，我的道德是上天赋予的，桓？又能把我怎么样！
        </p><p class="intro-text">为安全起见，弟子们催孔子速速离开。为防备司马桓？追击，还给孔子化了装，改变了原定南下陈国的路线，出城门西行，直下郑国都城新郑。
        </p>
    `);
};

//来到了郑国的路上
window.Zhengguo = function Zhengguo() {
    $('.main-index').html(`
        <p class="intro-text"> 
        西元前494年，那时的孔子58岁。孔子那时离开了宋国并来到了郑国，他们在半路中和弟子们失散了。那时候的孔子就独自一人的在东郭门口等候，当时已经走得很疲惫的孔子，形状似乎看着很狼狈不堪，引来了很多在此路过行人们的关注。子贡和孔子在下的弟子们，到处的向路人们打听孔子老师的下落，有一位郑国的当地人告诉子贡说：“我刚才在东郭城门下看到有一个人，额头长得很像尧王，颈项很像皋陶，两个肩膀又很像子产，腰部以下，身长较大于禹差三寸。脊背微屈，样子又瘦又累，神态却像一只丧家之犬。”
        子贡找到孔子后，把路人对老师的形象描绘转述于老师听。孔子听后大笑说：“说我外貌像古之圣王贤相，实在不敢当。但说我像一只丧家之犬，倒真是很像啊，很像啊！”
        </p> 
    `);
};

//困于陈
window.Chenguo= function Chenguo() {
    $('.main-index').html(`
        <p class="intro-text"> 
        孔子在陈国和蔡国之间的地方缺粮受困，饭菜全无，七天没吃上米饭了。白天睡在那，颜回去讨米，讨回来后煮饭，快要熟了。孔子看见颜回用手抓锅里的饭吃。一会，饭熟了，颜回请孔子吃饭，孔子假装没看见颜回抓饭吃的事情。孔子起身说：“刚刚梦见我的先人，我自己先吃干净的饭然后才给他们吃。”颜回回答道：“不是那样的，刚刚碳灰飘进了锅弄脏了米饭，丢掉又不好，就抓来吃了。”孔子叹息道：“按说应该相信眼睛看见的，但是眼睛也不一定可信；应该相信自己的心，自己的心也不可以相信。你们记住，要了解人本来就不容易啊。”</p> 
    `);
};

//去楚国路上
window.Chuguo = function Chuguo() {
    $('.main-index').html(`
        <p class="intro-text">
        公元前489年（鲁哀公六年），孔子一行在赴楚国负函途中，眼看目的地就要到了，可是前面有一条河流挡住了去路。那条河不是太宽，远远望去，河道蜿蜒曲折，水如银带，近看河水清澈见底，与另一条河流在此汇合。这天傍晚，孔子师徒走到这里，就是找不到渡口。没有渡口怎么过河呢？
        </p><p class="intro-text">正当孔子和他的弟子为过河犯愁之际，他们看到不远处田野里有两位老人正在低头锄地。这两位老人正是当时隐居在这里的高士长沮和桀溺。于是，孔子派大弟子子路前去向两位隐士请教渡口的位置。
        </p><p class="intro-text">两位隐士看到子路走过来，又看到不远处坐在车上的孔子。还没等子路说明来意，长沮手也不停地问子路：“那位坐在车上的人是谁？”“他是我的老师孔丘。”长沮抬起头，用嘲笑的口吻问：“是鲁国的孔丘吗？”“是的。”“哦，他不是生而知之吗？他应该知道渡口在哪里呀，还来问我们这些种地的人干吗？”
        </p><p class="intro-text">子路讨个没趣，又转身去问另一位隐士桀溺。桀溺停下锄头，问：“你是谁？”“我是仲由。”“你是鲁国孔丘的弟子吧？”“是的。”“告诉你，当今天下大乱，犹如滔滔洪水，谁能改变这样的世道呢？你与其跟着那个总是躲避坏人的人到处游历，还不如跟着我们这些避开乱世的人，做个隐士吧。”桀溺说完话，又忙着锄地，再也不理会子路了。
        </p><p class="intro-text">子路没有打听到渡口，只好把长沮和桀溺两位隐士的话转述给老师。孔子听后，心里相当难受，酸楚和悲凉还夹杂着一股落寞。过了好一会儿，孔子若有所失地告诉他的弟子：“人是不能同飞鸟走兽为伍的。鸟是飞的，在天空中可以自由飞翔；兽是山林中的，可以无忧无虑地行走。人各有志，只有各走各的路好了。可是，我们不同世上的人打交道，还同谁打交道呢？如果天下太平，符合正道，我也没有必要这么辛苦周游列国力图改变这个乱世了！”
        </p><p class="intro-text">后来，在一位农夫的指点下，孔子和他的弟子在太阳快要落山的时候终于找到了渡口，过了河，并顺利到达负函。
        </p><p class="intro-text">据文献记载和考证，罗山子路问津处较为符合历史事实，同时我们需要了解的是信阳也是孔子周游列国的终点。</p>
    `);
};

//问礼老聃
window.yancheng = function yancheng() {
    $('.main-index').html(`
        <p class="intro-text"> 
        公元前538年，孔子三十四岁，孔子当时积极奔命于各国之间，主张自己的学说（礼仪和仁政）；但是事不遂意，孔子处处碰壁，没有国君采纳其主张，未免出现沮丧而迷茫的心境。孔子听说周朝的收藏史老聃，是一个博学的圣人，便欲求教。于是对弟子南宫敬叔说：“周之守藏室史老聃，博古通今，知礼乐之源，明道德之要。今吾欲去周求教，汝愿同去否？” 南宫敬叔听罢，便准备车马，共赴老聃之所。
        </p> 
    `);
};

data_keyplace = {
    "Country": ["Pukou", "Qiguo", "Luguo", "Weiguo","Suixian",  "Songguo", "Zhengguo", "Chenguo", "Chuguo"],
    "Latitude": [35.94521, 37.4749, 35.5951, 35.7676, 34.4545,  34.4147, 34.3956, 33.6262,  30.3454],
    "Longitude": [117.3878, 118.0497, 116.9919, 115.0324, 115.0707,  115.6564, 113.7398, 114.6969, 112.2423]
}

var functions = {};
data_keyplace.Country.forEach(Country => {
    if (typeof window[Country] === 'function') {
        functions[Country] = window[Country];
    } else {
        console.warn(`${Country} is not defined as a function in window`);
    }
});
var positions = [
    // 鲁国
    [116.99192141, 35.59517013],
    [117.07885197, 35.68446911],
    [117.17268957, 35.73831235],
    [117.27278324, 35.8316898],
    [117.38789137, 35.94521901],
    //前往齐国的路上Pukou
    [117.49549304, 36.08083521],
    [117.80890993, 36.38341353],
    [118.04970701, 37.47497219],
    // 齐国
    [117.86659716, 36.79924549],
    [117.67601622, 36.63055797],
    [117.5866816, 36.49023493],
    [117.30676834, 36.1463318],
    [117.1492854, 35.92535009],
    [116.99194737, 35.59511139],
    // 鲁国
    [116.83115841, 35.57479018],
    [116.71587389, 35.57953771],
    [116.45174084, 35.60683065],
    [116.13507158, 35.70880051],
    [115.79359222, 35.68364174],
    [115.43898126, 35.6789003],
    [115.0324216, 35.76766293],
    // 卫国
    [114.98245457, 35.6186754],
    [114.99186238, 35.26201738],
    [115.01029931, 34.96721026],
    [115.03063895, 34.80481517],
    [115.06488165, 34.63315284],
    [115.07077983, 34.45455455],
    // 睢县
    [114.65495773, 35.18447589],
    [114.61149561, 35.23289983],
    [114.64705509, 35.27699435],
    [114.88807134, 35.64608256],
    [115.00792019, 35.75517386],
    [115.03249685, 35.76762914],
    // 返回卫国
    [116.97045776, 35.58171653],
    // 返回鲁国
    [116.56014388, 35.64323592],
    [115.59077168, 35.71379382],
    [115.0324216, 35.79796293],
    // 再次前往卫国
    [115.2060409, 35.47875925],
    [115.37568537, 35.10470304],
    [115.58699866, 35.05818463],
    [ 115.65647983, 34.41475455],
    //曹国，宋国
    [114.84565452, 34.31226287],
    [114.50305818, 34.35898187],
    [113.73548249, 34.3963384],
    // 郑国
    [114.14095938, 34.06074362],
    [114.56340795, 33.8664356],
    [114.85007042, 33.7363622],
    [114.85761428, 33.70969632],
    [114.69695332, 33.62627739],
    // 陈国
    [114.26967128, 33.26233951],
    // 蔡国
    [113.62223233, 33.43764156],
    [113.32980608, 33.62624314],
    [113.68644481, 33.57309233],
    [114.27108437, 33.28800323],
    // 返回蔡国
    [113.7505668, 32.39493185],
    [113.32434377, 31.47481395],
    [112.23951743, 30.33949103],
    // 楚国
    [112.42522231, 31.00816834],
    [112.73310217, 31.73610562],
    [113.25550749, 32.67401536],
    [113.64825527, 33.78079944],
    [114.9778408, 35.75242505],
    [115.39274511, 35.62222423],
    // 返回卫国
    [115.76663563, 35.55099128],
    [116.27395395, 35.51262205],
    [116.54175716, 35.46962679],
    [116.79258841, 35.52643708],
    [116.96986726, 35.56940202],
    [116.96845003, 35.57136189]
    // 返回鲁国
  ];  

