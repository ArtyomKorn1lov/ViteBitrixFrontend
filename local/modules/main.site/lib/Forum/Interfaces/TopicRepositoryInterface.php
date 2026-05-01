<?php

namespace Main\Site\Forum\Interfaces;

use Main\Site\Forum\Models\Group;
use Main\Site\Forum\Models\ShortGroup;
use Main\Site\Forum\Models\Topic;
use Main\Site\Forum\Models\TopicDetail;
use Main\Site\Forum\Models\TopicCreate;
use Main\Site\Forum\Models\TopicUpdate;

interface TopicRepositoryInterface
{
    /**
     * @param int $page
     * @return Group[]
     * @throws \Throwable
     */
    public function getGroups(int $page = 1): array;

    /**
     * @return ShortGroup[]
     * @throws \Throwable
     */
    public function getAllGroups(): array;

    /**
     * @param int $groupId
     * @param int $page
     * @return Topic[]
     * @throws \Throwable
     */
    public function getItems(int $groupId = 0, int $page = 1): array;

    /**
     * @param int $topicId
     * @return TopicDetail
     * @throws \Throwable
     */
    public function getById(int $topicId): TopicDetail;

    /**
     * @param TopicCreate $topic
     * @return int
     * @throws \Throwable
     */
    public function create(TopicCreate $topic): int;

    /**
     * @param TopicUpdate $topicUpdate
     * @return int
     * @throws \Throwable
     */
    public function update(TopicUpdate $topicUpdate): int;
}