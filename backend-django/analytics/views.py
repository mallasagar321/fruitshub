from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient

# 1. Connect directly to our shared MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['orangehub']

class ProfitLossView(APIView):
    def get(self, request):
        # 2. Fetch products directly from the Node.js collection
        products = list(db.products.find({'isActive': True}))

        data = []
        for p in products:
            cp = p.get('costPrice', 0)
            sp = p.get('sellingPrice', 0)
            
            # Calculate margin safely
            margin = round((sp - cp) / sp * 100, 2) if sp else 0

            data.append({
                'name': p.get('title', 'Unknown'),
                'costPrice': float(cp),
                'sellingPrice': float(sp),
                'margin': margin
            })

        return Response({'graphData': data})

class SeasonalityView(APIView):
    def get(self, request):
        products = list(db.products.find({'isSeasonal': True}))
        
        matrix = [{
            'fruit': p.get('title', 'Unknown'),
            'months': p.get('seasonalityMonths', []),
            'peak': p.get('seasonalityMonths', []) 
        } for p in products]

        return Response({'seasonalityMatrix': matrix})