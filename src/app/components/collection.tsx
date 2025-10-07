import CollectionProgress from "./collection-progress";
import { Card } from "./ui/card";

interface CollectionProps {
    title: string;
}

export default function CollectionCard({ title }: CollectionProps) {
    const data = [{
        collectionTitle: 'TUITION CENTER A (MONTHLY)',
        amount: 10000.00,
        percentage: 45
    }, {
        collectionTitle: 'SHREDDER2U.COM.MY',
        amount: 7500.00,
        percentage: 15
    }, {
        collectionTitle: 'EZ BOUTIQUE',
        amount: 4000.00,
        percentage: 7
    }, {
        collectionTitle: 'BOOKSTORE SHOPIFY',
        amount: 3000.00,
        percentage: 5
    }, {
        collectionTitle: 'MARKETING WITH JOY',
        amount: 2500.00,
        percentage: 4
    }];

    return (
        <Card className="p-4 rounded-md">
            <h1>{title}</h1>
            {data.map((item, index) => (
                <CollectionProgress key={index} title={item.collectionTitle} amount={item.amount} percentage={item.percentage} />
            ))}
        </Card>
    );
}