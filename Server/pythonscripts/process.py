# from skimage.measure import compare_ssim as ssim
# import matplotlib.pyplot as plt
import numpy as np
from clarifai import rest
from clarifai.rest import ClarifaiApp
from clarifai.rest import Image as ClImage
from clarifai.rest import Video as ClVideo
from pprint import pprint
# import cv2
import json


input_img = 'public/User_data/target.jpeg'   # via bytes or from pc
#via url below
# input_img = 'https://www.cafecoffeeday.com/sites/default/files/Veg-Samosa_2.jpg'
train_imput = True

files = {                           #files to train the images for recognition
    'aloo_chaat.png' : 'Aloo Chaat',
    'barfi.png' : 'Barfi',
    'broccoli.png' : 'Broccoli',
    'burger.png' : 'Burger',
    'momos.png' : 'Momos',
    'pasta.png' : 'Pasta',
    'nachos.png' : 'Nachos',
    'alooParanthe.png' : 'Aloo Paranthe',
    'alooSabzi.png' : 'Aloo Sabzi',
    'aloo_tikki.png' : 'Aloo Tikki',
    'apple.png' : 'Apple',
    'apple1.png' : 'Apple',
    'apple2.png' : 'Apple',
    'breadPakoda.png' : 'Bread Pakoda',
    'burger1.png' : 'Burger',
    'burger2.png' : 'Burger',
    'carrot1.png' : 'Carrot',
    'carrots.png' : 'Carrot',
    'chicken_biryani.png' : 'Chicken Biryani',
    'chicken_curry.png' : 'Chicken Curry',
    'chicken_rice.png' : 'Chicken Rice',
    'chole.png' : 'Chole',
    'chole_bhature.png' : 'Chole Bhature',
    'choleBhature.png' : 'Chole Bhature',
    'cocacola.png' : 'Cocacola',
    'cocacola1.png' : 'Cocacola',
    'cutlets.png' : 'Cutlets',
    'french_fries.png' : 'French Fries',
    'indianChaat.png' : 'Indian Chaat',
    'lays.png' : 'Lays',
    'pav_bhaji.png' : 'Pav Bhaji',
    'pepsi.png' : 'Pepsi',
    'samosa.png' : 'Samosa',
    'samosa1.png' : 'Samosa',
    'lays1.png' : 'Lays',
    'moong_halwa.png' : 'Moong Halwa',
    'samosa2.png' : 'Samosa',
    'pizza.png' : 'Pizza',
    'pizza1.png' : 'Pizza',
    'pizza2.png' : 'Pizza',
    'sarsoKaSaag.png' : 'Sarso ka Saag',
    'tandoori_salad.png' : 'Tandoori Salad',
    'thai_noodles.png' : 'Noodles',
    'salad.png' : 'Salad',
    'salad.png' : 'Salad'
}


train = ['http://cdni.condenast.co.uk/639x426/a_c/21Samosa_CNT_16nov12_iStock_b.jpg',
    'https://www.cafecoffeeday.com/sites/default/files/Veg-Samosa_2.jpg',
    'https://i.ytimg.com/vi/AAm95jaoAJc/hqdefault.jpg',
    'http://www.claywok.com/wp-content/uploads/2014/11/samosa1.jpg',
    'https://3.imimg.com/data3/QF/YM/MY-999826/veg-samosa-250x250.jpg',
    'https://australianseed.com/persistent/catalogue_images/products/tomato-indian-river.jpg',
    'https://media.science360.gov/files/story/58e1907d-a01d-4c38-9ce9-65fc52e3edd8-largeImage.jpg',
    'http://foodpunch.com/wp-content/uploads/2013/08/Tomato-Chutney-recipe-3.jpg',
    'http://d3gyiijzpk1c44.cloudfront.net/upload/product_photos/base/0/37/127/original1.2457519.1.jpg',
    'https://5.imimg.com/data5/IT/KP/GLADMIN-8255852/indian-apple-500x500.png',
    'https://3.imimg.com/data3/KJ/IL/MY-12884742/wp-content-uploads-2015-01-us-gala-apples-500x500.jpg',
    'http://timeandtidewatches.com/wp-content/uploads/2016/05/Fuji-Dry1.jpg',
    'https://3.imimg.com/data3/SN/JK/MY-6095522/apple-250x250.jpg',
    'https://pixel.nymag.com/imgs/daily/grub/2017/05/04/04-gluten-free-banana.w710.h473.jpg',
    'https://previews.123rf.com/images/sgtphoto/sgtphoto0807/sgtphoto080700007/3267515-single-banana-Stock-Photo.jpg',
    'https://www.bbcgoodfood.com/sites/default/files/glossary/banana-crop.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/1/13/Banana%2C_%E0%B4%8F%E0%B4%A4%E0%B5%8D%E0%B4%A4%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B4%B4%E0%B4%82%2C_%E0%B4%A8%E0%B5%87%E0%B4%A8%E0%B5%8D%E0%B4%A4%E0%B5%8D%E0%B4%B0%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B4%B4%E0%B4%82.JPG',
    'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F67ffd860-4f73-11e6-85e4-64b46cb01797.jpg?crop=3889%2C2188%2C192%2C545&resize=685',
    'https://thumbs.dreamstime.com/z/single-okra-isolated-white-5823395.jpg',
    'https://thumbs.dreamstime.com/z/okra-fresh-isolated-white-background-33176330.jpg',
    'https://thumbs.dreamstime.com/z/lady-s-finger-isolated-5823402.jpg',
    'http://cdn.star2.com/wp-content/uploads/2015/04/76CE39B69F344FA89D8805DAB74E41B2.jpg',
    'https://static8.depositphotos.com/1364913/846/i/950/depositphotos_8469277-stock-photo-one-single-onion.jpg',
    'https://www.americanseedco.com/wp-content/uploads/2013/06/Onion-Red-Burgandy.jpg',
    'https://s3.amazonaws.com/images.pdpics.com/images/314-single-onion-vegetable.jpg',
    'https://i5.walmartimages.com/asr/d21469d9-1335-4014-acdd-3c9e4a54cfb7_1.fa6ccc3ded78f624b309fc9286885e1e.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
    'https://www.ishopindian.com/images/D/lays_amesourcream_nc.jpg',
    'http://apcdeals.com/wp-content/uploads/2016/02/lays-american-style-cream-onion-flavour-55gm-600x600.jpg',
    'https://4.imimg.com/data4/MQ/TT/MY-32649351/coke-coca-cola-1-25-liter-250x250.jpg',
    'https://4.imimg.com/data4/KC/BY/MY-30522162/coke-can-300-ml-250x250.jpg',
    'http://knowledge.wharton.upenn.edu/wp-content/uploads/2010/05/050610_coke.jpg',
    'http://www.coca-colaindia.com/content/dam/journey/in/en/private/Choices/LandingPage/coke.jpg',
    'http://im.rediff.com/money/2013/oct/24cola4.jpg',
    'https://s3-eu-west-1.amazonaws.com/media.santu.com/2876/green-capsicum-Fotolia_36771970_XS_13623877587534.jpg',
    'http://d3gyiijzpk1c44.cloudfront.net/upload/product_photos/base/0/23/254/original1.1572422.1.jpg',
    'https://www.markon.com/sites/default/files/styles/large/public/pi_photos/Bell_Peppers_Green_Choice_Hero.jpg',
    'https://5.imimg.com/data5/JV/EC/MY-32042105/green-capsicum-250x250.jpg',
    'https://foodblogs-sympledesignllc.netdna-ssl.com/kBCf6obqibM4RpJv11zOS5sg-h0=/www.flavorsofmumbai.com%2Fwp-content%2Fuploads%2F2011%2F09%2FMumbai-Pav-Bhaji-1-4.jpg',
    'https://i.ytimg.com/vi/rSLiOqJ2egU/maxresdefault.jpg',
    'http://media1.sailusfood.com/wp-content/uploads/2010/03/pav-bhaji.jpg',
    'https://i.ytimg.com/vi/BuTe5lV7TlQ/hqdefault.jpg',
    'https://indianhealthyrecipes.com/wp-content/uploads/2017/03/pav-bhaji.jpg',
    'https://static4.depositphotos.com/1002457/279/i/950/depositphotos_2795611-stock-photo-carrot.jpg',
    'https://4.imimg.com/data4/YW/AH/MY-15298091/red-carrot-250x250.jpg',
    'http://staffingstream.wpengine.netdna-cdn.com/wp-content/uploads/2012/12/carrots.jpg',
    'http://cdn.potatopro.com/cdn/farfuture/hU5XuQNKIBXiWjVsMhK1PJKO_MyXmc_YVv8OcPHYJyg/mtime:1470929551/sites/default/files/pictures/french-fries-1200.jpg',
    'http://recipes.timesofindia.com/photo/54659021.cms?width=800&height=800',
    'http://img.taste.com.au/MudZOM3z/taste/2016/11/french-fries-87711-1.jpeg',
    'https://i2.wp.com/chatorediaries.com/wp-content/uploads/2015/07/Chole_Bhature_2.png?resize=750%2C557',
    'http://punjabi-recipes.com/wp-content/uploads/img/CholeBhature.jpg',
    'https://3.bp.blogspot.com/-uck7Fi_bRfw/UA7ogu0DrzI/AAAAAAAARSI/rmu9iluFJG0/s640/cb+ten.jpg',
    'https://www.cookforindia.com/wp-content/uploads/2015/12/chole-bhature-cover.jpg',
    'https://i2.wp.com/files.hungryforever.com/wp-content/uploads/2017/05/15161625/Momo-Festival-at-Wangs-Kitchen-5.jpg?w=1269&strip=all&quality=80',
    'http://www.vegrecipesofindia.com/wp-content/uploads/2014/07/steamed-momos.jpg',
    'https://www.ndtv.com/cooks/images/Lamb.Momos.with.Sweet.Chilli.Sauce-620.jpg',
    'http://img.taste.com.au/mdKxKxoR/taste/2016/11/chicken-momos-with-tomato-achar-46671-1.jpeg',
    'https://1.bp.blogspot.com/-X1FcRyarqD4/WSWGbVRJbgI/AAAAAAAABq8/zijsmomSjQErDTGUwcWVPJJbpVlloVTfwCLcB/s1600/Final1.jpg',
    'https://indianhealthyrecipes.com/wp-content/uploads/2016/04/bread-pakora-recipe.jpg',
    'https://i2.wp.com/files.hungryforever.com/wp-content/uploads/2016/05/14052346/maxresdefault5.jpg?fit=1205%2C768',
    'https://www.wikihow.com/images/1/18/Make-Bread-Pakora-Step-18.jpg'
]

clarifai_key = 'df23862769534e7881e2ae91ba747ded'
app = ClarifaiApp(api_key = clarifai_key)   
model = app.models.get('food-items-v1.0')  

check_concepts = ['samosa', 'tomato', 'apple', 'banana', 'lady finger', 
                'onion', 'lays', 'coke', 'capsicum', 'pav bhaji']


#this is how to do it in v2 of clarifai
#img1 = ClImage(url="https://samples.clarifai.com/puppy.jpeg", concepts=['boscoe'], not_concepts=['our_wedding'])

# testImg0 = ClImage(url=train[0], concepts=["samosa"], not_concepts=["pastry", "bread pakora", "pav bhaji", "momos", "chole bhature"])
# testImg1 = ClImage(url=train[1], concepts=["samosa"], not_concepts=["pastry", "bread pakora", "pav bhaji", "momos", "chole bhature"])    
# testImg2 = ClImage(url=train[2], concepts=["samosa"], not_concepts=["pastry", "bread pakora", "pav bhaji", "momos", "chole bhature"])
# testImg3 = ClImage(url=train[3], concepts=["samosa"], not_concepts=["pastry", "bread pakora", "pav bhaji", "momos", "chole bhature"])
# testImg4 = ClImage(url=train[4], concepts=["samosa"], not_concepts=["pastry", "bread pakora", "pav bhaji", "momos", "chole bhature"])
# testImg5 = ClImage(url=train[5], concepts=["tomato"], not_concepts=["apple", "coke", "carrot"])
# testImg6 = ClImage(url=train[6], concepts=["tomato"], not_concepts=["apple", "coke", "carrot"])
# testImg7 = ClImage(url=train[7], concepts=["tomato"], not_concepts=["apple", "coke", "carrot"])
# testImg8 = ClImage(url=train[8], concepts=["apple"], not_concepts=["tomato", "coke", "carrot"])
# testImg9 = ClImage(url=train[9], concepts=["apple"], not_concepts=["tomato", "coke", "carrot"])
# testImg10 = ClImage(url=train[10], concepts=["apple"], not_concepts=["tomato", "coke", "carrot"])
# testImg11 = ClImage(url=train[11], concepts=["apple"], not_concepts=["tomato", "coke", "carrot"])
# testImg12 = ClImage(url=train[12], concepts=["apple"], not_concepts=["tomato", "coke", "carrot"])
# testImg13 = ClImage(url=train[13], concepts=["banana"], not_concepts=["samosa", "french fries", "pav bhaji", "carrot"])
# testImg14 = ClImage(url=train[14], concepts=["banana"], not_concepts=["samosa", "french fries", "pav bhaji", "carrot"])
# testImg15 = ClImage(url=train[15], concepts=["banana"], not_concepts=["samosa", "french fries", "pav bhaji", "carrot"])
# testImg16 = ClImage(url=train[16], concepts=["banana"], not_concepts=["samosa", "french fries", "pav bhaji", "carrot"])
# testImg17 = ClImage(url=train[17], concepts=["banana"], not_concepts=["samosa", "french fries", "pav bhaji", "carrot"])
# testImg18 = ClImage(url=train[18], concepts=["lady finger"], not_concepts=["samosa", "carrot", "lays"])
# testImg19 = ClImage(url=train[19], concepts=["lady finger"], not_concepts=["samosa", "carrot", "lays"])
# testImg20 = ClImage(url=train[20], concepts=["lady finger"], not_concepts=["samosa", "carrot", "lays"])
# testImg21 = ClImage(url=train[21], concepts=["lady finger"], not_concepts=["samosa", "carrot", "lays"])
# testImg22 = ClImage(url=train[22], concepts=["onion"], not_concepts=["tomato","apple", "carrot","coke"])
# testImg23 = ClImage(url=train[23], concepts=["onion"], not_concepts=["tomato","apple", "carrot","coke"])
# testImg24 = ClImage(url=train[24], concepts=["onion"], not_concepts=["tomato","apple", "carrot","coke"])
# testImg25 = ClImage(url=train[25], concepts=["lays"], not_concepts=["lady finger", "capsicum"])
# testImg26 = ClImage(url=train[26], concepts=["lays"], not_concepts=["lady finger", "capsicum"])
# testImg27 = ClImage(url=train[27], concepts=["lays"], not_concepts=["lady finger", "capsicum"])
# testImg28 = ClImage(url=train[28], concepts=["coke"], not_concepts=["tomato","apple","onion", "carrot"])
# testImg29 = ClImage(url=train[29], concepts=["coke"], not_concepts=["tomato","apple","onion", "carrot"])
# testImg30 = ClImage(url=train[30], concepts=["coke"], not_concepts=["tomato","apple","onion", "carrot"])
# testImg31 = ClImage(url=train[31], concepts=["coke"], not_concepts=["tomato","apple","onion", "carrot"])
# testImg32 = ClImage(url=train[32], concepts=["coke"], not_concepts=["tomato","apple","onion", "carrot"])
# testImg33 = ClImage(url=train[33], concepts=["capsicum"], not_concepts=["lady finger", "lays"])
# testImg34 = ClImage(url=train[34], concepts=["capsicum"], not_concepts=["lady finger", "lays"])
# testImg35 = ClImage(url=train[35], concepts=["capsicum"], not_concepts=["lady finger", "lays"])
# testImg36 = ClImage(url=train[36], concepts=["capsicum"], not_concepts=["lady finger", "lays"])
# testImg37 = ClImage(url=train[37], concepts=["pav bhaji"], not_concepts=["samosa", "banana", "momos", "bread pakora", "chole bhature"])
# testImg38 = ClImage(url=train[38], concepts=["pav bhaji"], not_concepts=["samosa", "banana", "momos", "bread pakora", "chole bhature"])
# testImg39 = ClImage(url=train[39], concepts=["pav bhaji"], not_concepts=["samosa", "banana", "momos", "bread pakora", "chole bhature"])
# testImg40 = ClImage(url=train[40], concepts=["pav bhaji"], not_concepts=["samosa", "banana", "momos", "bread pakora", "chole bhature"])
# testImg41 = ClImage(url=train[41], concepts=["pav bhaji"], not_concepts=["samosa", "banana", "momos", "bread pakora", "chole bhature"])
# testImg42 = ClImage(url=train[42], concepts=["carrot"], not_concepts=["coke", "samosa", "tomato", "apple","banana"])
# testImg43 = ClImage(url=train[43], concepts=["carrot"], not_concepts=["coke", "samosa", "tomato", "apple","banana"])
# testImg44 = ClImage(url=train[44], concepts=["carrot"], not_concepts=["coke", "samosa", "tomato", "apple","banana"])
# testImg45 = ClImage(url=train[45], concepts=["french fries"], not_concepts=["banana", "samosa", "pav bhaji", "bread pakora"])
# testImg46 = ClImage(url=train[46], concepts=["french fries"], not_concepts=["banana", "samosa", "pav bhaji", "bread pakora"])
# testImg47 = ClImage(url=train[47], concepts=["french fries"], not_concepts=["banana", "samosa", "pav bhaji", "bread pakora"])
# testImg48 = ClImage(url=train[48], concepts=["chole bhature"], not_concepts=["banana", "samosa", "pav bhaji", "french fries", "bread pakora"])
# testImg49 = ClImage(url=train[49], concepts=["chole bhature"], not_concepts=["banana", "samosa", "pav bhaji", "french fries", "bread pakora"])
# testImg50 = ClImage(url=train[50], concepts=["chole bhature"], not_concepts=["banana", "samosa", "pav bhaji", "french fries", "bread pakora"])
# testImg51 = ClImage(url=train[51], concepts=["chole bhature"], not_concepts=["banana", "samosa", "pav bhaji", "french fries", "bread pakora"])
# testImg52 = ClImage(url=train[52], concepts=["momos"], not_concepts=["onion", "samosa", "pav bhaji", "french fries"])
# testImg53 = ClImage(url=train[53], concepts=["momos"], not_concepts=["onion", "samosa", "pav bhaji", "french fries"])
# testImg54 = ClImage(url=train[54], concepts=["momos"], not_concepts=["onion", "samosa", "pav bhaji", "french fries"])
# testImg55 = ClImage(url=train[55], concepts=["momos"], not_concepts=["onion", "samosa", "pav bhaji", "french fries"])
# testImg56 = ClImage(url=train[56], concepts=["bread pakora"], not_concepts=["chole bhature", "samosa", "pav bhaji", "french fries","banana"])
# testImg57 = ClImage(url=train[57], concepts=["bread pakora"], not_concepts=["chole bhature", "samosa", "pav bhaji", "french fries","banana"])
# testImg58 = ClImage(url=train[58], concepts=["bread pakora"], not_concepts=["chole bhature", "samosa", "pav bhaji", "french fries","banana"])
# testImg59 = ClImage(url=train[59], concepts=["bread pakora"], not_concepts=["chole bhature", "samosa", "pav bhaji", "french fries","banana"])

# app.inputs.bulk_create_images([testImg0, testImg1, testImg2, testImg3, testImg4, testImg5,
#             testImg6, testImg7, testImg8, testImg9, testImg10, testImg11, testImg12, testImg13, 
#             testImg14, testImg15, testImg16, testImg17, testImg18, testImg19, testImg20, testImg21,
#             testImg22, testImg23, testImg24, testImg25, testImg26, testImg27, testImg28, testImg29,
#             testImg30, testImg31, testImg32, testImg33, testImg34, testImg35, testImg36, testImg37,
#             testImg38, testImg39, testImg40, testImg41, testImg42, testImg43, testImg44, testImg45,
#             testImg46, testImg47, testImg48, testImg49, testImg50, testImg51, testImg52, testImg53,
#             testImg54, testImg55, testImg56, testImg57, testImg58, testImg59])


# train_model = app.models.create(model_id="samosa", concepts=["samosa"]) 
# train_model = train_model.train()

# new_train_model = app.models.create(model_id="custom1", concepts=["samosa", "tomato", "apple", "banana", "lady finger", "onion", "lays", "coke", "capsicum"])
# new_train_model = new_train_model.train()

#new way to create model v2 clarifai
# model = app.models.create('pets', concepts=['boscoe'])

# latest_model = app.models.create("custom3", concepts=["samosa", "tomato", "apple", "banana", "lady finger", "onion", "coke", "capsicum", "pav bhaji"])
# latest_model = latest_model.train()

s_model = app.models.get('food-custom2')
# s_model.train()


def compare_images(imageA, files):
	#compute the mean squared error and structural similarity
	# index for the images
	m = mse(imageA, imageB)
	s = ssim(imageA, imageB)


def clarifai_rec(input_img, model, s_model):

    image = ClImage(file_obj=open(input_img, 'rb'))
    # image = ClImage(url=input_img)
    predict = model.predict([image])
    pre_s = s_model.predict([image])
    # j_predict = json.loads(predict)  
    # pprint(predict)      #debug
    # pprint(pre_s)

    train_name = pre_s["outputs"][0]["data"]["concepts"][0]["name"]
    train_value = pre_s["outputs"][0]["data"]["concepts"][0]["value"]  
    print train_name, "$"+str(train_value)+"@"
    # print 
    rec_name = predict["outputs"][0]["data"]["concepts"][0]["name"]
    rec_value = predict["outputs"][0]["data"]["concepts"][0]["value"]
    # print rec_name, rec_value   #food item recognized and value
    return rec_name, train_name



def grey_scale(input_img, files):
    dim = (250,250)        #dimensions for our image
    g_ssim = 0                  #initial error rate
    grey_match_file = ''
    original = cv2.imread(input_img, 0)
    rs_original = cv2.resize(original, dim, interpolation = cv2.INTER_AREA)
    #original = cv2.cvtColor(original, cv2.COLOR_BGR2GRAY)
    for k in files.keys():
        test_img = cv2.imread(k, 0)
        rs_test_img = cv2.resize(test_img, dim, interpolation = cv2.INTER_AREA)
        ssm = ssim(rs_original, rs_test_img)
        # print k,ssm
        if(ssm > g_ssim):
            g_ssim = ssm
            grey_match_file = k

    # print files[grey_match_file]
    return g_ssim, grey_match_file


def bgr_scale(input_img, files):
    dim = (250,250)      
    bg_ssim = 0              
    bgr_match_file = ''
    original = cv2.imread(input_img)
    rs_original = cv2.resize(original, dim, interpolation = cv2.INTER_AREA)
    #original = cv2.cvtColor(original, cv2.COLOR_BGR2GRAY)
    for k in files.keys():
        test_img = cv2.imread(k)
        rs_test_img = cv2.resize(test_img, dim, interpolation = cv2.INTER_AREA)
        ssm = ssim(rs_original, rs_test_img, multichannel=True)  
        # print k,ssm
        if(ssm > bg_ssim):
            bg_ssim = ssm
            bgr_match_file = k

    # print files[bgr_match_file]
    return bg_ssim, bgr_match_file



rec_name, train_name = clarifai_rec(input_img, model, s_model)
# g_ssim, grey_match_file = grey_scale(input_img, files)
# bg_ssim, bgr_match_file = bgr_scale(input_img, files)
# print rec_name, train_name
if(train_imput):
    print "$"+train_name+"@"
else:
    print rec_name
