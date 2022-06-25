import {  Avatar, Card, Skeleton, } from 'antd';


export default function TokenCard(props) {
    const { Meta } = Card;
  return (
          <Card
            style={{ width: '98%', marginTop: 16 }}
          >
            <Skeleton loading={props.loading} avatar active>
              <Meta
                avatar={<Avatar src={props.avatar} />}
                title={props.title}
                description={props.description}
              />
            </Skeleton>
          </Card>
       
  );
};


