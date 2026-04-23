<?php

namespace Sprint\Migration;


class TopicIBSections20260423174532 extends Version
{
    protected $author = "admin";

    protected $description = "Разделы ИБ - темы для обсуждения";

    protected $moduleVersion = "5.6.2";

    /**
     * @return bool|void
     * @throws Exceptions\HelperException
     */
    public function up()
    {
        $helper = $this->getHelperManager();

        $iblockId = $helper->Iblock()->getIblockIdIfExists(
            'topics',
            'forum'
        );

        $helper->Iblock()->saveSectionsFromTree(
            $iblockId,
            array(
                0 =>
                    array(
                        'NAME' => 'Интернет и коммуникации',
                        'CODE' => 'internet-i-kommunikatsii',
                        'SORT' => '100',
                        'ACTIVE' => 'Y',
                        'XML_ID' => '046bcb52-8ba5-498d-b06e-7c1c5858d764',
                        'PICTURE' => NULL,
                        'DESCRIPTION' => '',
                        'DESCRIPTION_TYPE' => 'text',
                        'DETAIL_PICTURE' => NULL,
                    ),
                1 =>
                    array(
                        'NAME' => 'Покупка устройств Apple',
                        'CODE' => 'pokupka-ustroystv-apple',
                        'SORT' => '200',
                        'ACTIVE' => 'Y',
                        'XML_ID' => 'd837de40-d476-4a4f-aaa4-7c782c86cc58',
                        'PICTURE' => NULL,
                        'DESCRIPTION' => '',
                        'DESCRIPTION_TYPE' => 'text',
                        'DETAIL_PICTURE' => NULL,
                    ),
                2 =>
                    array(
                        'NAME' => 'Телевизоры',
                        'CODE' => 'televizory',
                        'SORT' => '300',
                        'ACTIVE' => 'Y',
                        'XML_ID' => '6bea244f-65e4-4b16-bb16-37bd801daa7d',
                        'PICTURE' => NULL,
                        'DESCRIPTION' => '',
                        'DESCRIPTION_TYPE' => 'text',
                        'DETAIL_PICTURE' => NULL,
                    ),
            ));
    }

    public function down()
    {
    }
}
